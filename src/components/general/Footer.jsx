import { Github, Globe } from "lucide-react"

const Footer = () => {
    return(
      <footer className="flex w-full justify-center">
        <a className="flex items-center gap-1 hover:underline hover:underline-offset-4 pr-2" href="https://github.com/ashkangl" target="_blank" rel="noopener noreferrer nofollow"><Github />Github</a>
        <a className="flex items-center gap-1 hover:underline hover:underline-offset-4" href="https://Ashkangolzad.ir" target="_blank" rel="noopener noreferrer"><Globe />AshkanGolzad.ir</a>
      </footer>
    )
}

export default Footer