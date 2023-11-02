import React, { useEffect, useState } from "react";



const Pokemon = ({item}) => {

    console.log("Im in the pokemon function");
    console.log("item", item);
    return (
        <>
          {item && (
            <div>
              <div>{item.name}</div>
              <div>{item.url}</div>
              <div>End</div>
            </div>
          )}
        </>
      );
    };



export default Pokemon;