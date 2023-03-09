//PROD
// export const baseURL = "https://bookingsapi-app.herokuapp.com/api/v1";
export const baseURL = `${process.env.REACT_APP_API_URL}/api/v1`;
console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
//LOCAL
// export const baseURL = "http://localhost:8000/api/v1";
