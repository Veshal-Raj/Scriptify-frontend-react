import { Link } from "react-router-dom"
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import { getFullDay } from "../hooks/date";
import { useEffect } from "react";

interface SocialIcons {
  [key: string]: JSX.Element; 
}

const About = ({  bio, social_links, joinedAt }) => {
  const socialIcons: SocialIcons = {
    instagram: <InstagramIcon />,
    youtube: <YouTubeIcon />,
    facebook: <FacebookIcon />,
    github: <GitHubIcon />,
    twitter: <XIcon />,
    website: <LanguageIcon />
  };


  useEffect(()=>{
    console.log('hello')
    console.log(bio, social_links,joinedAt )
  },[])

  return (
    <div className={"md:w-[90%] md:mt-7   "  }>
        <p className="text-xl leading-7">{bio.length ? bio: 'Nothing to read here.'}</p>
        <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 item-center text-gray-600">
        {Object.keys(social_links).map((key, index) => {
          const link = social_links[key];
          const IconComponent = socialIcons[key.toLowerCase()];
          return link ? (
            <Link key={index} to={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
              {IconComponent}
              {/* <span className="ml-2">{key}</span> */}
            </Link>
          ) : null;
        })}
        </div>
        <p className="text-xl leading-7 text-gray-600">Joined on {getFullDay(joinedAt)}</p>
    </div>
  )
}

export default About