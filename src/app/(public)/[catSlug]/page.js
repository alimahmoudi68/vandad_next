import CategoryPage from '@/components/pages/public/category/categoryPage/CategoryPage';


export const metadata = {
  title: 'دسته بندی',
  description: '',
}

export default async function CatSlug(context) {
  try{

    let {params } = context; 

    console.log('params' , params )

    return (
      <CategoryPage/>
    )

  }catch(err){
    console.log("error")
  }
  
}


