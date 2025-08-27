import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Homepage(props){
    return (
        <div>
            <h2>Alivia Cantik</h2>
            <h2>{props.Judul}</h2>
            <h2>{props.Deskripsi}</h2>
            <h2>{props.Ulasan}</h2>
        </div>
    )
}
