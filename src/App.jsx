// import Component from "./widgets/example";

import useData from "./hooks/useData";

export default function App() {
  const data = useData(
    "https://irserver2.eku.edu/Apps/DataPage/PROD/Accreditation/ATMAE/data",
  );

  const obj = data ? data : {};

  const metrics = Object.entries(obj)
    .filter(([, v]) => Array.isArray(v) && v.length > 1)
    .map(([k]) => k)
    .sort();

  const programs = [
    ...new Set(
      Object.entries(obj)
        .filter(([, v]) => Array.isArray(v) && v.length > 1)
        .map(([, v]) => v.map(({ p_title }) => p_title))
        .flat()
        .filter(Boolean),
    ),
  ].sort();

  console.log("data", data);

  console.log("metrics", metrics);

  console.log("programs", programs);

  return (
    <>
      <div>
        <h1>React app</h1>
        <hr></hr>
      </div>
    </>
  );
}
