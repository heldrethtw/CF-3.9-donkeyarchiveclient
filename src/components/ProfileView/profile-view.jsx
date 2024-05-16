//import { response } from "express";
import React, { useState, useEffect } from "react";

const ProfileView = () => {
  // Initial state for the user object
  const [user, setUser] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState({ ...user });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://donkey-archive.herokuapp.com/users/${user.Username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEditUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error loading the user", error);
        setError("There was an error loading the user");
        setIsLoading(false);
      });
  }, [user.Username]);

  // Handle changes to the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  // Validate user inputs before saving
  const validate = (fields) => {
    let tempErrors = {};
    if (!fields.Username) tempErrors.Username = "Username is required";
    if (fields.Username && fields.Username.length < 3)
      tempErrors.Username = "Username must be at least 3 characters long";
    if (!fields.Email) tempErrors.Email = "Email is required";
    if (fields.Email && !/\S+@\S+\.\S+/.test(fields.Email))
      tempErrors.Email = "Email is invalid";
    if (!fields.Birthday) tempErrors.Birthday = "Birthday is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Save changes and exit edit mode
  const saveChanges = () => {
    if (validate(editUser)) {
      setIsLoading(true);
      fetch(`https://donkey-archive.herokuapp.com/users/${user.Username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editUser),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("There was an error saving the user");
        })
        .then((data) => {
          setUser(data);
          setEditMode(false);
          setErrors({});
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("There was an error saving the user", error);
          setError("There was an error saving the user");
          setIsLoading(false);
        });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-view">
      {!editMode ? (
        <div>
          <h2>{user.Username || "Your"}'s Profile</h2>
          <p>Email: {user.Email || "No email set"}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveChanges();
          }}
        >
          <label>
            Username:
            <input
              type="text"
              name="Username"
              value={editUser.Username || ""}
              onChange={handleChange}
            />
            {errors.Username && (
              <div style={{ color: "red" }}>{errors.Username}</div>
            )}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="Password"
              value={editUser.Password || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={editUser.Email || ""}
              onChange={handleChange}
            />
            {errors.Email && <div style={{ color: "red" }}>{errors.Email}</div>}
          </label>
          <label>
            Birthday:
            <input
              type="date"
              name="Birthday"
              value={editUser.Birthday || ""}
              onChange={handleChange}
            />
            {errors.Birthday && (
              <div style={{ color: "red" }}>{errors.Birthday}</div>
            )}
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileView;
