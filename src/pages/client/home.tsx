import { useAuthContext } from "@/components/context/auth.context";

const HomePage = () => {
    const { userData } = useAuthContext();
    return (
        <>
            <div>
                {JSON.stringify(userData)}
            </div>
        </>
    )
}

export default HomePage;