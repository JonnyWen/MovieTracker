import { useParams } from "react-router";

export const MovieDesc: React.FC = () => {
    const { id } = useParams(); // read dynamic values from url
    return (
        <span 
          className="text-white text-2xl font-bold"
        >
            This is movie {id} </span>
    );
};