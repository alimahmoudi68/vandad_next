import IndexPage from "@/components/pages/public/home/homePage/HomePage";

export const metadata = {
  title: "فروشگاه فاب |‌  خانه",
  description: "",
};

export default async function Home() {
  const sliders = [
    {
      img: "shop/slider%2Fs1.jpg",
      title: "فروشگاه فاب",
      subtitle: "فروشگاه فاب",
      link: "/",
    },
    {
      img: "shop/slider%2Fs2.jpg",
      title: "فروشگاه فاب",
      subtitle: "فروشگاه فاب",
      link: "/",
    },
  ];
  try {
    return <IndexPage sliders={sliders} />;
  } catch (err) {
    console.log("error");
  }
}
