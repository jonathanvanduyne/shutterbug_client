const editProfileButton = (profile) => {
    return currentUser.id === profile?.shutterbug_user?.id ? 
    (
      <button
        onClick={() => {
          navigate(`/edit-profile/${profile.id}`);
        }}
      >
        Edit
      </button>
    ) 
    : null;
  };