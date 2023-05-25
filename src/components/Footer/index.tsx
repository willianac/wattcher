import { GithubFilled, LinkedinFilled } from "@ant-design/icons";

function Footer() {

  const openLinkedinTab = () => {
    window.open("https://www.linkedin.com/in/willianac/")
  }

  const openGithubTab = () => {
    window.open("https://github.com/willianac")
  }
    
  return (
    <footer className="h-28 flex justify-center items-center bg-black p-12 gap-4">
      <span className="text-colorPrimary">Developed by Willian</span>
      <button onClick={openLinkedinTab}>
        <LinkedinFilled className="text-colorPrimary text-xl"/>
      </button>
      <button onClick={openGithubTab}>
        <GithubFilled className="text-colorPrimary text-xl"/>
      </button>
    </footer>
  )
}

export default Footer;