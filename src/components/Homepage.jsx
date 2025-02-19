import { useEffect, useState } from "react"

const Homepage = () => {
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)

    const fetchPosts = async() => {
        try {
            const res = await fetch('http://127.0.0.1:5000/posts')
            const rawResponse = await res.text()
            const data = JSON.parse(rawResponse)
            setPosts(data.posts)
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchPosts()
    },[])

    return(
<div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading posts</p>
            ) : posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index}>{post[1]}</div>
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    )
}

export default Homepage