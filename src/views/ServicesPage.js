import React from "react";
import "../components/addServiceForm/addServiceForm.css";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import CardServices from "../components/cardServices/CardServices";

function App({
  activityTypes,
  posts,
  currentPage,
  setCurrentPage,
  totalPages,
  activityTypeId,
  refreshPosts,
  handleActivityTypeClick,
}) {
  return (
    <div className="app-container">
      <HeaderSmall />
      <div className="content-container">
        <CardServices
          activityTypes={activityTypes}
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          activityTypeId={activityTypeId}
          refreshPosts={refreshPosts}
          handleActivityTypeClick={handleActivityTypeClick}
        />
      </div>
    </div>
  );
}

export default App;
