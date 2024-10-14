import { useState,useRef,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
const Home = ()=>{
    const [menu, setMenu] = useState(false);
    const [dispArr, setDispArr] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const inRef = useRef(null);
    const navigate = useNavigate();
    const showmenu = (e)=>{
    if(menu) {
      console.log(e.target,e.target.tagName);
      if(e.target.tagName == 'I') {
        e.target.parentElement.parentElement.style.height = '3.5rem';
      }
      else {
        e.target.parentElement.style.height = '3.5rem';
      }
      setMenu(false);
    }
    else {
      if(e.target.tagName == 'DIV') {
        e.target.parentElement.style.height = '5.8rem';
      }
      else {
        e.target.parentElement.parentElement.style.height = '5.8rem';
      }
      setMenu(true);
    }
  }
  const getImages = async(page) => {
    let resp = await fetch(`https://api.unsplash.com/photos/?page=${page}&per_page=20&client_id=mKF2f2UHbRFgwLp9jIJ6knMi2a3RKMsVVnWHYOqFves`);
    let data = await resp.json();
    return data;
  }
  const setDisplayData = async(page)=>{
    let data = await getImages(page);
    let images = data.map(obj=>{
      return {
        id: obj.id,
        url: obj.urls.small,
        desc: obj.sponsorship?.tagline,
        name: obj.user.name,
        time: obj.updated_at
      }
    });
    setDispArr([...dispArr,...images]);
  }

  useEffect(()=>{
    const handleScroll = async()=>{
      if(window.scrollY + window.innerHeight + 30 >= document.body.offsetHeight) {
        setDisplayData(page);
        setPage((page)=>page+1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return ()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  },[window.scrollY]);

  useEffect(()=>{
    setDisplayData(1);
    setPage(page+1);
  },[])

  const showDetails = (id,e)=>{
    e.preventDefault();
    navigate(`/details/${id}`);
  }

    return (
        <>
          <nav>
        <p>ImageGallery</p>
        <div className="search-cont">
          <input ref={inRef} onKeyUp={(e)=>{if(e.key=="Enter")setQuery(e.target.value)}} type="text" placeholder="Search Images..."/>
          <button onClick={()=>setQuery(inRef.current.value)}>Search</button>
        </div>
        <div onClick={showmenu} className="menu">
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>
      <div className="disp">
        {
          dispArr.filter((data)=>{
            return data.desc?.toLowerCase().includes(query.toLowerCase()) || data.name.toLowerCase().includes(query.toLowerCase())
          }).map(data => {
            return (
              <div onClick={(e)=>showDetails(data.id,e)} key={data.id + Date.now()} className="card">
                <img src={data.url} alt="" />
                <div className="card-desc">
                  <h2>{data.name}</h2>
                  <p>{data.desc}</p>
                  <p>{data.time}</p>
                </div>
                <div className="zoom-controls">
                  <i className="fas fa-search-plus zoom-in"></i>
                  <i className="fas fa-search-minus zoom-out"></i>
                </div>
                <div className="stripe"></div>
              </div>
            )
          })
        }
      </div>
        </>
    )
}

export default Home;