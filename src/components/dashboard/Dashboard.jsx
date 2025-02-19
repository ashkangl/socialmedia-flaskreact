import Baseurl from "../general/Baseurl"

const Dashboard = ({ setIsAuthenticated, userInfo }) => {
    const handleLogout = async () => {
        try {
            const response = await fetch(`${Baseurl}/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            localStorage.removeItem("isAuthenticated")
            setIsAuthenticated(false)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    console.log(userInfo)

    return (
        <div>
            <div>
                <div className="w-full text-center md:text-3xl text-xl md:mt-4 mt-2">Dashboard</div>
            </div>

            <button className="bg-red-500 hover:bg-blue-500 p-2 rounded-md text-white" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Dashboard
