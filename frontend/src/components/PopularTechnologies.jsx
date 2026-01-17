import technologies from "../data/technologies";

const PopularTechnologies = ({ searchedCourse, notFound }) => {
  return (
    <section className="mt-16 px-20">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Popular Technologies
      </h2>

      <div className="grid grid-cols-4 gap-8">
        {/* SEARCH RESULT */}
        {searchedCourse && (
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">{searchedCourse.icon}</div>
            <h3 className="font-semibold">{searchedCourse.name}</h3>
          </div>
        )}

        {/* NOT FOUND */}
        {notFound && (
          <div className="col-span-4 bg-white shadow p-8 rounded-xl text-center">
            <p className="text-lg font-semibold">❌ Course Not Found</p>
            <p className="text-gray-500 text-sm mt-1">
              Please search valid technology
            </p>
          </div>
        )}

        {/* DEFAULT VIEW */}
        {!searchedCourse && !notFound &&
          technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{tech.icon}</div>
              <h3 className="font-semibold">{tech.name}</h3>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PopularTechnologies;
