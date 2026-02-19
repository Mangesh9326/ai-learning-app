import React from 'react';

const InstructorCard = ({ instructor, category, reviews }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor</h2>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl shrink-0">
          {instructor.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-bold text-indigo-600 underline cursor-pointer">{instructor}</h3>
          <p className="text-sm text-gray-500 mb-4">Top Rated Instructor in {category}</p>
          <p className="text-sm text-gray-600">
            {instructor} is a leading expert with years of experience in the industry. 
            They have taught over {reviews.toLocaleString()} students on AiLearn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;