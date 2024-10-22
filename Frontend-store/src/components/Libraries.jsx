import React from 'react';
import Card from './Card';
import { useState, useEffect } from 'react';
const Libraries = ({ libraries }) => {
  return (
    <div className='container flex flex-wrap justify-center gap-4' id='cards'>
      {libraries && libraries.map((library) => {
        return (
          <Card
          key={library.bookID}
          bookID={library.bookID}
          title={library.title}
          img={library.img}
          author={library.author}
          publicationYear={library.publicationYear}
          category={library.category}
          page={library.page}
          price={library.price}
          />
        );
      })}
      </div>
  )
}

export default Libraries