import requests
from bs4 import BeautifulSoup
import json
import time

# Run dengan python detikscrap.py

BASE_URL = "https://www.detik.com/search/searchall"

def scrape_detik(query, max_pages=3):
    results = []

    for page in range(1, max_pages + 1):
        try:
            params = {"query": query, "sortby": "time", "page": page}
            response = requests.get(BASE_URL, params=params, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, "html.parser")
            articles = soup.find_all("article", class_="list-content__item")

            for article in articles:
                link_tag = article.find("a", href=True)
                if not link_tag:
                    continue
                url = link_tag["href"]

                detail = scrape_detik_detail(url)

                img_tag = article.find("img")
                detail["image"] = img_tag["src"] if img_tag else None

                results.append(detail)

                time.sleep(1)

        except Exception as e:
            print(f"Error scraping page {page}: {e}")

    return results


def scrape_detik_detail(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        title_tag = soup.find("h1", class_="detail__title")
        title = title_tag.get_text(strip=True) if title_tag else "No title"

        date_tag = soup.find("div", class_="detail__date")
        pub_date = date_tag.get_text(strip=True) if date_tag else "Unknown date"

        body_container = soup.find("div", class_="detail__body-text")
        paragraphs = body_container.find_all("p") if body_container else []
        body_text = "\n".join(p.get_text(strip=True) for p in paragraphs)

        return {
            "title": title,
            "publication_time": pub_date,
            "body": body_text,
        }

    except Exception as e:
        return {"error": str(e), "url": url}


if __name__ == "__main__":
    query = input("Masukkan kata kunci pencarian: ")
    data = scrape_detik(query, max_pages=3)

    print(json.dumps(data, indent=2, ensure_ascii=False))
