import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";

export default function RequireAuth() {

    const navigate = useNavigate();
    const location = useLocation();
    const authToken = localStorage.getItem("auth") ?? null;

    if (!authToken) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return (
        <>
            <button className="btn btn-secondary" onClick={async () => {
                try {
                    // cf. https://create-react-app.dev/docs/adding-custom-environment-variables/
                    const response =
                        await fetch(`${process.env.REACT_APP_API_URL}/authentication/logout`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                                "Content-Type": "application/json"
                            }
                        });
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    localStorage.removeItem("auth");
                    navigate("/");
                }
            }}>Logout
            </button>
            <Outlet/>
        </>
    );

}
