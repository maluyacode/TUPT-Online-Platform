import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Paper } from '@mui/material';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function HomeImageList() {
    return (
       
            <ImageList
                sx={{ height: 500 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
     
    );
}

const itemData = [
    {
        img: '/tupt-images/1.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: '/tupt-images/2.jpg',
        title: 'Burger',
    },
    {
        img: '/tupt-images/3.jpg',
        title: 'Camera',
    },
    {
        img: '/tupt-images/4.jpg',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: '/tupt-images/5.jpg',
        title: 'Hats',
        cols: 2,
    },
    {
        img: '/tupt-images/6.jpg',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: '/tupt-images/7.jpg',
        title: 'Basketball',
    },
    {
        img: '/tupt-images/8.jpg',
        title: 'Fern',
    },
    {
        img: '/tupt-images/9.jpg',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: '/tupt-images/10.jpg',
        title: 'Tomato basil',
    },
    {
        img: '/tupt-images/12.jpg',
        title: 'Sea star',
    },
    {
        img: '/tupt-images/13.jpg',
        title: 'Bike',
        cols: 2,
    },
];  