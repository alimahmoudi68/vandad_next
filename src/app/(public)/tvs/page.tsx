import TvsPage from "@/components/pages/public/tv/tv/Tv";
import { getTvs } from "@/services/public/tvs/tvService";
import { getTvCats } from "@/services/public/tvs/tvCatsService";
import { ITv, ITvCat } from "@/types/tv";


export const metadata = {
  title: "فروشگاه فاب |‌  خانه",
  description: "",
};


export default async function Tvs() {

  try {

      const [tvRes, tvCatsRes] = await Promise.allSettled([
        getTvs(1, 8, ''),
        getTvCats()
      ]);

      let tvs: ITv[] = [];
      let tvCats: ITvCat[] = [];

      if (tvRes.status === 'fulfilled' && tvRes.value?.status === 'success' && Array.isArray(tvRes.value.tvs)) {
        tvs = tvRes.value.tvs;
      }

      if (tvCatsRes.status === 'fulfilled' && tvCatsRes.value?.status === 'success' && Array.isArray(tvCatsRes.value.categories)) {
        tvCats = tvCatsRes.value.categories;
      }

    return <TvsPage tvs={tvs} tvCats={tvCats}/>;
  } catch (err) {
    console.log("error");
  }
}
