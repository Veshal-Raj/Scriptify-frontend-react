import { Button, ButtonGroup, useMediaQuery } from "@mui/material";
import { useState } from "react";

const ProfileInPageNavigation = ({ setActiveTab, isSameUser }) => {
    const [selectedTab, setSelectedTab] = useState("blogPublished");
    const isMediumScreen = useMediaQuery('(min-width:960px)');
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setSelectedTab(tab);
    };
  
    return (
      <ButtonGroup variant="text" aria-label="navigation" className="mt-4 " sx={{ borderColor: "transparent" }}>
        <Button
          onClick={() => handleTabChange("blogPublished")}
          sx={{ bgcolor: selectedTab === "blogPublished" ? '#F3F4F6' : 'transparent' }}
        >
          Blog Published
        </Button>
        {isSameUser && (
          <Button
            onClick={() => handleTabChange("savedBlogs")}
            sx={{ bgcolor: selectedTab === "savedBlogs" ? '#F3F4F6' : 'transparent' }}
          >
            Saved Blogs
          </Button>
        )}
        {!isMediumScreen && (
          <Button
            onClick={() => handleTabChange("about")}
            sx={{ bgcolor: selectedTab === "about" ? '#F3F4F6' : 'transparent' }}
          >
            About
          </Button>
        )}
      </ButtonGroup>
    );
  };
  
  export default ProfileInPageNavigation;