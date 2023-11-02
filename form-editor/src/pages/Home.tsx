/* eslint-disable no-console */
import { Button } from "@/components/ui/button";
import useLocalStorage from "@/hooks/LocalStorage";
import { PencilIcon, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {nanoid} from "nanoid"
import { API_URL } from "@/lib/constants";

function Home() {
  const navigate = useNavigate();
  const [forms, setForms] = useLocalStorage("forms",[]);
  const [data, setData] = useState([]);
    useEffect(() => {
      if(forms.length > 0){
        
        fetch(API_URL+"forms",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({forms})
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            setData(res.response);
          });
      }
    },[])


  
  return (
    <main className="mt-10">
      <Button className="absolute right-10 top-5" onClick={() => {
              const id = nanoid(10);
              if(forms === null) setForms([{id}])
              else
                setForms([...forms, {id}])
              setTimeout(() => {
                navigate(`/form/${id}/edit`);

              }, 500)

            }}>
              Create New Form
              </Button>
      <table className="  mx-auto border border-slate-100 rounded-sm">
        <thead>
          <tr className="flex w-full bg-slate-200 text-left text-sm font-extralight">
            <th className="p-3 min-w-[50px]">#</th>
            <th className="min-w-[300px] p-3 ">Forms</th>
            <th className="min-w-[300px] p-3 ">Created On</th>
            <th className="min-w-[300px] p-3 ">Responses</th>
            <th className="min-w-[300px] p-3 ">Edit</th>
          </tr>
        </thead>
        <tbody>
          {!forms && <p className=" h-20 w-full flex justify-center items-center">No form found</p>}
          {
          data.length > 0 && data?.map((e, idx) => {
            return (
              <tr key={idx} className="flex w-full text-left text-sm ">
                <td className="min-w-[50px] p-3">{idx + 1}</td>
                <td className="min-w-[300px] p-3">{e?.title ?? "UnTitle"}</td>
                <td className="min-w-[300px] p-3">{e?.createdOn ?? "NIL"}</td>
                <td className="min-w-[300px] p-3"><Link to={`/form/${e.id}/responses`}><User2 /> </Link></td>
                <td className="min-w-[300px] p-3">
                  <Button variant="ghost">
                    <Link to={`/form/${e.id}/edit`}>
                        <PencilIcon strokeWidth={1} size="16px" />
                    </Link>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Home;
