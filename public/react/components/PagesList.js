import React from 'react'
import { Page } from './Page'
import * as React from 'react';
import Button from '@mui/material/Button';

export const PagesList = ({ pages, fetchPage, fetchDeletePage }) => {
  return <>
		{
			pages.map((page, idx) => {
				
				return (<div style={{ display: 'flex', flexDirection:"row", justifyContent: 'space-around', width: "800px", padding: "25px" , columnGap: "200px"}}>
					
					
					<section style ={{width: "750px", }}>
					<a onClick ={() =>fetchPage(page.slug)}><Page page={page} key={idx} className = "articlePage" /></a>
					</section>
					<section style={{display: "flex", flexDirection: "row", columnGap: "25px" }}>
				 <Button variant="outlined"  size="small" className= "pageNav"  style={{borderRadius: "10px", width: "200px"}} onClick ={() =>fetchPage(page.slug)}>{page.title}</Button>
				 <Button variant="outlined" size="small" className='delete' style={{borderRadius: "10px", width: "100px"}} onClick ={() =>{fetchDeletePage(page.slug);}}>Delete</Button>
				 </section>
				 </div>)
			})
		}
	</>
}
