import { Button, ButtonGroup, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProfileInPageNavigationProps {
  setActiveTab: (tab: string) => void;
  isSameUser: boolean;
 }

const ProfileInPageNavigation = ({ setActiveTab, isSameUser }: ProfileInPageNavigationProps) => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("blogPublished");
  const isMediumScreen = useMediaQuery('(min-width:960px)');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedTab(tab);
  };

  useEffect(() => {
    setSelectedTab("blogPublished");
  }, [id]);

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