
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkoutCategoriesSection from './components/WorkoutCategoriesSection';
import EquipmentSelector from './components/EquipmentSelector';
import FeatureSection from './components/FeatureSection';
// import Footer from './components/Footer'; // Removed Footer import
import CategoryExercisesPage from './components/CategoryExercisesPage';
import EquipmentExercisesPage from './components/EquipmentExercisesPage';
import CountdownWidget from './components/CountdownWidget';
import CountdownTimerPage from './components/CountdownTimerPage';
import FloatingActionMenu from './components/FloatingActionMenu';
// HydrationWidget import removed
import CalendarWidget from './components/CalendarWidget';
import NutritionWidget from './components/NutritionWidget';
// HealthStatsWidget import removed
import NotificationSection from './components/NotificationSection';
import FilteredExercisesPage from './components/FilteredExercisesPage';
import UsernameModal from './components/UsernameModal'; // Added
import { featuresData, EXERCISES_DATA, MOTIVATIONAL_QUOTES } from './constants';
import { FeatureItem, WorkoutCategory, EquipmentItem, PageType, AppNotificationItem } from './types';

const DEFAULT_DAILY_CALORIE_GOAL = 2000;
const CALORIE_INCREMENT = 300;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | null>(null);
  const [selectedEquipmentForPage, setSelectedEquipmentForPage] = useState<EquipmentItem | null>(null);
  
  const [selectedEquipmentForFilteredView, setSelectedEquipmentForFilteredView] = useState<EquipmentItem | null>(null);
  const [selectedMuscleGroupForFilteredView, setSelectedMuscleGroupForFilteredView] = useState<WorkoutCategory | null>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return false;
  });
  const [showCountdownWidget, setShowCountdownWidget] = useState<boolean>(false);
  // showHydrationWidget state removed
  const [showCalendarWidget, setShowCalendarWidget] = useState<boolean>(false);
  const [showNutritionWidget, setShowNutritionWidget] = useState<boolean>(false);
  // showHealthStatsWidget state removed

  // currentWaterIntake and dailyWaterGoal states removed

  const [currentCalories, setCurrentCalories] = useState<number>(0);
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState<number>(DEFAULT_DAILY_CALORIE_GOAL);

  // healthData state removed

  const [notifications, setNotifications] = useState<AppNotificationItem[]>([]);
  const [motivationalNotification, setMotivationalNotification] = useState<AppNotificationItem | null>(null);

  const [username, setUsername] = useState<string | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);


  useEffect(() => {
    const storedUsername = localStorage.getItem('fitSharkUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    // Always show the modal on app load/reload
    setShowUsernameModal(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  // useEffects for hydration data (currentWaterIntake, dailyWaterGoal) removed

  useEffect(() => {
    const savedCalories = localStorage.getItem('nutritionCurrentCalories');
    const savedCalorieGoal = localStorage.getItem('nutritionDailyCalorieGoal');
    if (savedCalories !== null) {
      setCurrentCalories(parseInt(savedCalories, 10));
    }
    if (savedCalorieGoal !== null) {
      setDailyCalorieGoal(parseInt(savedCalorieGoal, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nutritionCurrentCalories', String(currentCalories));
  }, [currentCalories]);

  useEffect(() => {
    localStorage.setItem('nutritionDailyCalorieGoal', String(dailyCalorieGoal));
  }, [dailyCalorieGoal]);

  // useEffect for healthData removed

  const handleSetUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem('fitSharkUsername', name);
    setShowUsernameModal(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleSelectCategory = (category: WorkoutCategory) => {
    setSelectedCategory(category);
    setSelectedEquipmentForPage(null);
    setSelectedEquipmentForFilteredView(null);
    setSelectedMuscleGroupForFilteredView(null);
    setCurrentPage('category');
    window.scrollTo(0, 0);
  };

  const handleShowEquipmentExercises = (equipment: EquipmentItem) => {
    setSelectedEquipmentForPage(equipment);
    setSelectedCategory(null);
    setSelectedEquipmentForFilteredView(null);
    setSelectedMuscleGroupForFilteredView(null);
    setCurrentPage('equipment');
    window.scrollTo(0, 0);
  };
  
  const handleShowFilteredExercisesPage = (equipment: EquipmentItem, muscleGroup: WorkoutCategory) => {
    setSelectedEquipmentForFilteredView(equipment);
    setSelectedMuscleGroupForFilteredView(muscleGroup);
    setSelectedCategory(null);
    setSelectedEquipmentForPage(null);
    setCurrentPage('filteredExercises');
    window.scrollTo(0, 0);
  };


  const handleNavigateHome = () => {
    setSelectedCategory(null);
    setSelectedEquipmentForPage(null);
    setSelectedEquipmentForFilteredView(null);
    setSelectedMuscleGroupForFilteredView(null);
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const toggleCountdownWidgetVisibility = () => {
    setShowCountdownWidget(prev => !prev);
  };

  // toggleHydrationWidgetVisibility handler removed

  const toggleCalendarWidgetVisibility = () => {
    setShowCalendarWidget(prev => !prev);
  };

  const toggleNutritionWidgetVisibility = () => {
    setShowNutritionWidget(prev => !prev);
  };

  // toggleHealthStatsWidgetVisibility handler removed

  // handleAddWater handler removed

  const handleAddCalories = (amount: number = CALORIE_INCREMENT) => {
    setCurrentCalories(prevCalories => Math.min(prevCalories + amount, dailyCalorieGoal * 2));
  };

  const handleNavigateToCountdownTimer = () => {
    setSelectedCategory(null);
    setSelectedEquipmentForPage(null);
    setSelectedEquipmentForFilteredView(null);
    setSelectedMuscleGroupForFilteredView(null);
    setCurrentPage('countdown');
    window.scrollTo(0, 0);
  };

  const handleScheduleClick = () => {
    toggleCalendarWidgetVisibility();
  };

  // handleHealthStatsClick handler removed

  const showOrRefreshMotivationalQuote = () => {
    if (MOTIVATIONAL_QUOTES.length === 0) return;
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    const randomQuote = MOTIVATIONAL_QUOTES[randomIndex];

    const currentMotivationalId = motivationalNotification?.id;
    const isExistingInNotifications = currentMotivationalId ? notifications.some(n => n.id === currentMotivationalId) : false;

    if (motivationalNotification && currentMotivationalId && isExistingInNotifications) {
      // Motivational notification exists and is visible, update its message
      const updatedNotification: AppNotificationItem = {
        ...motivationalNotification,
        message: randomQuote,
        isExiting: false, // Ensure it's not marked for exit
      };
      setMotivationalNotification(updatedNotification);
      setNotifications(prev =>
        prev.map(n => (n.id === currentMotivationalId ? updatedNotification : n))
      );
    } else {
      // Motivational notification doesn't exist or was closed, create a new one
      const newId = `motivation-${Date.now()}`;
      const newMotivationalItem: AppNotificationItem = {
        id: newId,
        title: "Motivation",
        message: randomQuote,
        isExiting: false,
      };
      setMotivationalNotification(newMotivationalItem);
      setNotifications(prev => {
        const filteredPrev = prev.filter(n => n.title !== "Motivation");
        return [newMotivationalItem, ...filteredPrev];
      });
    }
  };

  const removeNotification = (id: string) => {
    if (id === motivationalNotification?.id) {
      setMotivationalNotification(null); 
    }
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isExiting: true } : n))
    );
    setTimeout(() => {
      setNotifications(curr => curr.filter(n => n.id !== id));
    }, 300); 
  };
  
  useEffect(() => {
    if (currentPage === 'category' && selectedCategory) {
      document.title = `${selectedCategory.name} - FitShark`;
    } else if (currentPage === 'equipment' && selectedEquipmentForPage) {
      document.title = `${selectedEquipmentForPage.name} Exercises - FitShark`;
    } else if (currentPage === 'filteredExercises' && selectedEquipmentForFilteredView && selectedMuscleGroupForFilteredView) {
      document.title = `${selectedEquipmentForFilteredView.name} ${selectedMuscleGroupForFilteredView.name} - FitShark`;
    }
    else if (currentPage === 'countdown') {
      document.title = 'Countdown Timer - FitShark';
    }
    else {
      document.title = 'FitShark UI';
    }
  }, [currentPage, selectedCategory, selectedEquipmentForPage, selectedEquipmentForFilteredView, selectedMuscleGroupForFilteredView]);

  const commonNavbar = <Navbar
                          isDarkMode={isDarkMode}
                          toggleDarkMode={toggleDarkMode}
                          onNavigateHome={handleNavigateHome}
                          onNavigateToCountdownTimer={handleNavigateToCountdownTimer}
                          username={username} // Pass username
                        />;

  const renderPageContent = () => {
    if (currentPage === 'category' && selectedCategory) {
      const filteredExercises = EXERCISES_DATA.filter(
        exercise => exercise.categoryId === selectedCategory.id
      );
      return (
        <>
          {commonNavbar}
          <main>
            <CategoryExercisesPage
              category={selectedCategory}
              exercises={filteredExercises}
              onNavigateHome={handleNavigateHome}
            />
          </main>
          {/* <Footer /> Removed Footer */}
        </>
      );
    }

    if (currentPage === 'equipment' && selectedEquipmentForPage) {
      const filteredExercises = EXERCISES_DATA.filter(exercise => {
          if (exercise.equipment && selectedEquipmentForPage.name) {
              return exercise.equipment.toLowerCase().split(',').map(e => e.trim()).includes(selectedEquipmentForPage.name.toLowerCase());
          }
          return false;
      });
      return (
        <>
          {commonNavbar}
          <main>
            <EquipmentExercisesPage
              equipment={selectedEquipmentForPage}
              exercises={filteredExercises}
              onNavigateHome={handleNavigateHome}
            />
          </main>
          {/* <Footer /> Removed Footer */}
        </>
      );
    }
    
    if (currentPage === 'filteredExercises' && selectedEquipmentForFilteredView && selectedMuscleGroupForFilteredView) {
        const filteredExercises = EXERCISES_DATA.filter(exercise => {
            const equipmentMatch = exercise.equipment && exercise.equipment.toLowerCase().split(',').map(e => e.trim()).includes(selectedEquipmentForFilteredView.name.toLowerCase());
            const muscleGroupMatch = exercise.categoryId === selectedMuscleGroupForFilteredView.id;
            const notViewWorkouts = exercise.name.toLowerCase() !== 'view workouts';
            return equipmentMatch && muscleGroupMatch && notViewWorkouts;
        });
        return (
            <>
                {commonNavbar}
                <main>
                    <FilteredExercisesPage
                        equipment={selectedEquipmentForFilteredView}
                        muscleGroup={selectedMuscleGroupForFilteredView}
                        exercises={filteredExercises}
                        onNavigateHome={handleNavigateHome}
                    />
                </main>
                {/* <Footer /> Removed Footer */}
            </>
        );
    }

    if (currentPage === 'countdown') {
      return (
        <>
          {commonNavbar}
          <main className="flex-grow">
            <CountdownTimerPage onNavigateHome={handleNavigateHome} />
          </main>
        </>
      );
    }

    return (
      <>
        {commonNavbar}
        <main>
          <Hero />
          <div id="workout-categories-section">
            <WorkoutCategoriesSection onSelectCategory={handleSelectCategory} />
          </div>
          <div id="equipment-selector-section">
            <EquipmentSelector onShowFilteredExercisesPage={handleShowFilteredExercisesPage} />
          </div>
          {featuresData.map((feature: FeatureItem, index: number) => (
            <FeatureSection
              key={index}
              title={feature.title}
              description={feature.description}
              points={feature.points}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
              reverseLayout={index % 2 !== 0}
              bgColor={feature.bgColor}
              textColor={feature.textColor}
              customIcon={feature.customIcon}
            />
          ))}
        </main>
        {/* <Footer /> Removed Footer */}
      </>
    );
  };

  const baseAppClasses = "font-sans antialiased animate-fadeIn";
  let pageSpecificClasses = "bg-white dark:bg-neutral-900 text-neutral-dark dark:text-neutral-100";

  if (currentPage === 'countdown') {
    // For countdown, use neutral-900 which will pick up the new themed dark color in dark mode
    pageSpecificClasses = "bg-neutral-900 text-neutral-100 min-h-screen flex flex-col";
  }

  return (
    <div className={`${baseAppClasses} ${pageSpecificClasses}`}>
      {renderPageContent()}
      {showUsernameModal && (
        <UsernameModal isOpen={showUsernameModal} onSubmit={handleSetUsername} />
      )}
      {showCountdownWidget && <CountdownWidget onClose={toggleCountdownWidgetVisibility} />}
      {/* HydrationWidget rendering removed */}
      {showCalendarWidget && (
        <CalendarWidget
          isVisible={showCalendarWidget}
          onClose={toggleCalendarWidgetVisibility}
        />
      )}
      {showNutritionWidget && (
        <NutritionWidget
          currentCalories={currentCalories}
          dailyCalorieGoal={dailyCalorieGoal}
          onAddCalories={handleAddCalories}
          onClose={toggleNutritionWidgetVisibility}
          isVisible={showNutritionWidget}
        />
      )}
      {/* HealthStatsWidget rendering removed */}
      <FloatingActionMenu
        onToggleCountdownWidget={toggleCountdownWidgetVisibility}
        // onHydrationClick prop removed
        onScheduleClick={handleScheduleClick}
        // onHealthStatsClick prop removed
      />
      <NotificationSection
        notifications={notifications}
        onAddNotification={showOrRefreshMotivationalQuote}
        onRemoveNotification={removeNotification}
      />
    </div>
  );
};

export default App;
