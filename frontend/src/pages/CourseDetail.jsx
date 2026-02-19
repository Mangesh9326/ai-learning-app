import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Import Components
import CourseHero from '../components/courseDetail/CourseHero';
import CourseContent from '../components/courseDetail/CourseContent';
import InstructorCard from '../components/courseDetail/InstructorCard';
import PurchaseCard from '../components/courseDetail/PurchaseCard';
import BusinessPromo from '../components/courseDetail/BusinessPromo';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- FETCH LOGIC ---
  useEffect(() => {
    setLoading(true);
    fetch('/data/courses.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        const foundCourse = data.find((c) => c.id == id);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          console.error("Course not found");
          setCourse(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return <div className="text-center py-20">Course not found.</div>;
  }

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      
      {/* 1. Hero Section */}
      <CourseHero course={course} />

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-12">
            <CourseContent course={course} />
            <InstructorCard 
              instructor={course.instructor} 
              category={course.category} 
              reviews={course.reviews} 
            />
          </div>

          {/* RIGHT COLUMN (Sticky) */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24 space-y-6">
              <PurchaseCard course={course} />
              <BusinessPromo />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;