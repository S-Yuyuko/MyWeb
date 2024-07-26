import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLightTheme, googleDarkTheme } from '../themes/theme';
import { getContent, saveContent, getImages, addImage, deleteImage, getAdmins, addAdmin, deleteAdmin } from '../utils/indexedDB';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(googleLightTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [identity, setIdentity] = useState(localStorage.getItem('identity') || '');
  const [showInputs, setShowInputs] = useState(identity === 'admin');
  const [error, setError] = useState('');
  const [content, setContent] = useState({
    title: '',
    description: ''
  });
  const [newContent, setNewContent] = useState(content);
  const [sliderImages, setSliderImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const storedContent = await getContent();
      if (storedContent) {
        setContent(storedContent);
        setNewContent(storedContent);
      }
      const images = await getImages();
      setSliderImages(images);
    };

    fetchData();
  }, []);

  const initializeAdmin = async () => {
    const admins = await getAdmins();
    const adminExists = admins.some(admin => admin.account === 'wz1305290174');
    if (!adminExists) {
      await addAdmin({ account: 'wz1305290174', password: 'wzh123698745' });
    }

    // Remove duplicate admins
    const seen = new Set();
    for (const admin of admins) {
      if (seen.has(admin.account)) {
        await deleteAdmin(admin.id);
      } else {
        seen.add(admin.account);
      }
    }
  };

  useEffect(() => {
    initializeAdmin();
  }, []);

  const removeDuplicateAdmins = async () => {
    const admins = await getAdmins();
    const seen = new Set();
    for (const admin of admins) {
      if (seen.has(admin.account)) {
        await deleteAdmin(admin.id);
      } else {
        seen.add(admin.account);
      }
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === googleLightTheme ? googleDarkTheme : googleLightTheme;
      setIsDarkMode(!isDarkMode);
      return newTheme;
    });
  };

  const handleLogin = async (identity, username, password) => {
    if (!identity) {
      setError('Please select an identity before logging in.');
      return;
    }
    if (identity === 'admin') {
      if (username === 'wz1305290174' && password === 'wzh123698745') {
        setError('');
        setIdentity(identity);
        localStorage.setItem('identity', identity);
        setShowInputs(identity === 'admin');
        await removeDuplicateAdmins(); // Remove duplicates after successful login
        navigate('/home');
        return;
      }
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }
      const admins = await getAdmins();
      const admin = admins.find(admin => admin.account === username && admin.password === password);
      if (!admin) {
        setError('Invalid username or password.');
        return;
      }
    }
    setError('');
    setIdentity(identity);
    localStorage.setItem('identity', identity);
    setShowInputs(identity === 'admin');
    await removeDuplicateAdmins(); // Remove duplicates after successful login
    navigate('/home');
  };

  const handleIdentityChange = (selectedIdentity) => {
    setIdentity(selectedIdentity);
    localStorage.setItem('identity', selectedIdentity);
    setShowInputs(selectedIdentity === 'admin');
    setError('');
  };

  const resetIdentity = () => {
    setIdentity('');
    localStorage.removeItem('identity');
    setShowInputs(false);
    setError('');
  };

  const handleSave = async () => {
    await saveContent(newContent);
    setContent(newContent);
    setIsEditing(false);
  };

  const handleContentChange = (key, value) => {
    setNewContent((prevContent) => {
      const updatedContent = { ...prevContent, [key]: value };
      setContent(updatedContent);
      return updatedContent;
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUploadClick = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newImage = reader.result;
        await addImage(newImage);
        const images = await getImages();
        setSliderImages(images);
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageDelete = async (id) => {
    await deleteImage(id);
    const images = await getImages();
    setSliderImages(images);
  };

  const handleSaveAndRefresh = async () => {
    await handleSave();
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
        identity,
        setIdentity,
        handleLogin,
        showInputs,
        handleIdentityChange,
        resetIdentity,
        error,
        setError,
        content,
        handleSave,
        handleContentChange,
        sliderImages,
        handleFileChange,
        handleImageUploadClick,
        handleImageDelete,
        selectedFile,
        handleSaveAndRefresh,
        isEditing,
        setIsEditing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
