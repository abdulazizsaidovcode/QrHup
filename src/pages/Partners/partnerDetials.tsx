import React from 'react'
import { useParams } from 'react-router-dom';

export default function PartnerDetials() {
  const { id } = useParams();
  
  console.log(id);
  return (
    <div>
        
    </div>
  )
}
