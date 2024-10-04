import React, { useEffect, useState } from 'react'
import { PagesList } from './PagesList'
// import and prepend the api url to any fetch calls
import apiURL from '../api'
import Button from '@mui/material/Button';
import TextField from '@mui/system';



export const App = () => {
  const [pages, setPages] = useState([])
  const [displayPage, setDisplayPage] = useState()
  const [view, setView] = useState(true)
  const [addingArticle, isAddingArticle] = useState(false)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [email, setEmail] = useState("")
  const [tags, setTags] = useState("")
  const [slug, setSlug] = useState("")
  async function fetchPages () {
    try {
      const response = await fetch(`${apiURL}/wiki`)
      const pagesData = await response.json()
      setPages(pagesData)
      console.log(pagesData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }
  useEffect(() => {
    

    fetchPages()
  }, [])
  async function fetchPage(slug){
    const url = `${apiURL}/wiki/${slug}`
    const response = await fetch(url);
   const data = await response.json()
   const newDate = new Date(data.author['createdAt']).toDateString()
   console.log(`New date: ${newDate}`)
    console.log(data.author['createdAt'])
    setDisplayPage(data)
    console.log(response)
    console.log(data)
    console.log(slug)
    console.log(`${apiURL}/${slug}`)
    console.log(data.content)
    setView(false)
    return newDate
  }
  async function fetchSearchPage(e){
    e.preventDefault()
    let cslug = slug.trim()
    let newSlug = cslug.toLowerCase().replace(/ /g, "_")
    const isIncludedSlug = pages.some((obj) => obj.slug === newSlug)
    const url = `${apiURL}/wiki/${newSlug}`
    if(newSlug === "" || isIncludedSlug === false){
      alert("no page")
      console.log(newSlug)
      console.log(isIncludedSlug)
      setSlug("")
      return false
    }else{
    const response = await fetch(url);
   const data = await response.json()
   const newDate = new Date(data.author['createdAt']).toDateString()
   console.log(`New date: ${newDate}`)
    console.log(data.author['createdAt'])
    setDisplayPage(data)
    console.log(response)
    console.log(data)
    console.log(slug)
    console.log(`${apiURL}/${slug}`)
    console.log(data.content)
    setSlug("")
    setView(false)
    return newDate
    }
  }
  async function fetchDeletePage(slug){
    const url = `${apiURL}/wiki/${slug}`
    const response = await fetch(url, {method: 'DELETE'});
    const data = await response.json()
    const redirect = await fetch(`${apiURL}/wiki`)
    const pagesData = await redirect.json()
    setPages(pagesData)
    console.log(pagesData)
    setView(true)
  }
  async function fetchPostPage(){
  
    isAddingArticle(true)
    console.log(addingArticle)
    
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if(name === "" || email === "" || title === "" || content === "" || tags === ""){
      alert("all fields must have value")
      return false
    }else{
    alert("The form was submitted");
    const url = `${apiURL}/wiki`
    const createdPage = {name, title, content, email, tags}
    setPages([...pages, createdPage])
    const response = await fetch(url, {method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createdPage),
    });   
    const data = response.json()
    console.log(data)
    console.log(createdPage)
    console.log(pages)
    console.log("Submit")
    console.log(name, title, content, email, tags)
    setName("")
    setContent("")
    setEmail("")
    setTitle("")
    setTags("")
    await fetchPages()
    isAddingArticle(false)
    setView(true)
  }
  }
  
  return (
        <>
        {!view ? (<main >
              <header  className = 'wikiHeader'style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "space-around"}}><h1 onClick ={() => {setView(true);
              console.log(view)
              console.log("fetch")
            }} className='wikiMainPage'>WikiVerse</h1>
            <h2><strong>{displayPage.title}📚</strong></h2> 
            </header>
            <div className='mainView' style={{paddingTop: "20px"}}>
              <section style={{display: "flex", flexDirection: "row" , paddingTop: "50px", justifyContent: "space-evenly", padding: "50px"}}>
            <div className= 'pageDetails'>
            <p><b>Arthur:</b> {displayPage.author.name}</p>
            <p><b>#Tags</b> {displayPage.tags[0].name}</p>
            <p><b>Published:</b> {displayPage.author.createdAt}</p>
            <p>{displayPage.content}</p>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img src="https://picsum.photos/300"></img>
            <aside style={{fontSize: "13px", width: "275px"}}>caption: {displayPage.content}{displayPage.content}</aside>
            </div>
            </section>
            <section style={{display: "flex", flexDirection: "column", alignItems:"center", justifyItems: "center"}}>
              <p style={{width: "85%", lineHeight: "200%"}} className='mainPContent'>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Rutrum purus ridiculus scelerisque ipsum, duis urna mattis praesent accumsan. Id risus nam vestibulum, magnis porta amet a parturient. Taciti tempor at inceptos nam massa efficitur imperdiet. Finibus imperdiet dignissim pharetra risus turpis. Dapibus tincidunt eros hac etiam donec suspendisse quam ante. Nostra non imperdiet morbi eleifend ligula himenaeos.

Consequat taciti ut adipiscing; tempus curae facilisi accumsan maecenas nisl. Fermentum fermentum nec efficitur urna ante pellentesque congue; placerat lacus. Porttitor lacinia himenaeos libero feugiat lobortis. Enim massa enim hac inceptos accumsan sociosqu elit? Quisque aptent pellentesque dolor laoreet blandit sem aliquet risus. Eros purus sagittis pharetra metus at hendrerit ullamcorper laoreet. Class dapibus auctor nascetur enim primis; nisi tincidunt.
              </p>
              <div><p><b> Updated:</b> {displayPage.updatedAt}</p></div>

            </section>
            
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "50px", paddingTop: "50px", paddingBottom: "50px"}}>
            <Button variant="outlined" size="small" className= "delete" style={{borderRadius: "10px"}} onClick ={() => {fetchDeletePage(displayPage.slug);}}>Delete Page</Button>
            <Button variant="outlined"  size="small" className= "pageNav"  style={{borderRadius: "10px"}} onClick ={() => {setView(true);
              console.log(view)
              console.log("fetch")
            }}>Back to WikiList</Button>
            </div>
            </div>
          </main>)
    : addingArticle  ? 
     (<main style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div className = 'wikiHeader' style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "space-around"}}><h1 className='wikiMainPage' onClick ={() => {setView(true);
              console.log(view)
              console.log("fetch")
            }}>WikiVerse</h1>
			<h2>Add an interesting Article📚</h2>
      </div>
      <form className='mainView' onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "space-around", width: "60%", rowGap: "20px", paddingTop: "20px"}}>*All forms must be filled
      <input type="text" placeholder="title" aria-label="title" value = {title} onChange = {(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="name" aria-label="name" value = {name} onChange = {(e) => setName(e.target.value)} />
      <input type="text" placeholder="email" aria-label="email" value = {email} onChange = {(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="content" aria-label="content" value = {content} onChange = {(e) => setContent(e.target.value)} />
      <input  type="text" placeholder="tags" aria-label="tags" value = {tags} onChange = {(e) => setTags(e.target.value)} />
      <Button variant="outlined" size="small" type="submit" style={{borderRadius: "10px", width: "30%"}} className='submitButton'>Submit</Button>
      </form>
       
      <Button variant="outlined" style={{borderRadius: "10px"}} onClick ={() => {isAddingArticle(false);

              console.log(view)
              console.log("fetch")
            }} className='pageNav'>Back to WikiList</Button>   
      </main>
     )
    : 
    ( <>
    <main >
      <div className = 'wikiHeader' style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignContent: "space-around"}}><h1 className='wikiMainPage' onClick ={() => {setView(true);
              console.log(view)
              console.log("fetch")
            }}>WikiVerse</h1>
			<h2>An interesting 📚</h2>
      </div>
      <div className='mainView' style={{display: "flex", flexDirection: "column" , alignItems: "center", padding: "20px"}}>
			<PagesList pages={pages} fetchPage={fetchPage} fetchDeletePage={fetchDeletePage}/>
      </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "50px", padding: "20px"}}>
      <Button  variant="outlined"  className ='addArtGreen' size="small" style={{borderRadius: "10px"}} onClick ={() => {fetchPostPage();
console.log(addingArticle)
console.log("fetch")}}>Add Page</Button>
<form onSubmit={fetchSearchPage}> 
<input type="text" id = "slug" placeholder="search" aria-label="slug" value = {slug} onChange = {(e) => setSlug(e.target.value)} />
<Button variant="outlined" size="small" type='submit'  className='addSearch'>Search</Button>
</form>
      </div>
		</main></>) 
    }</>
  )
}
