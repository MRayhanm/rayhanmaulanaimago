const data = [
    {"id":1, "name":"Alice","category":"A", "sub_category":"X"},
    {"id":2, "name":"Bob","category":"B", "sub_category":"Y"},
    {"id":3, "name":"Charlie","category":"A", "sub_category":"Z"},
    {"id":4, "name":"David","category":"B", "sub_category":"X"}
]
const hasil = {}
for (let i = 0; i < data.length; i++) {
  const item = data[i];
  const { category, sub_category } = item;

  if (!hasil[category]) {
    hasil[category] = {};
  }
  if (!hasil[category][sub_category]) {
    hasil[category][sub_category] = [];
  }

  hasil[category][sub_category].push(item);
}


console.log(JSON.stringify(hasil, null, 2));