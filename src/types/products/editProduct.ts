export interface IVariantItem {
  price: string;
  stock: string;
  sku: string,
  attributes?: { 
    attribute: {
      title: string,
      slug: string,
      isDynamc: boolean
    },
    attributeMeta:{
      _id: string;
      title: string,
      slug: string,
    }
  }[]
}

export interface IAttributeItem {
  attribute: {
    _id: string,
    title: string,
    slug: string,
    isDynamic: boolean,
    createdAt: string,
    updatedAt: string
  },
  attributeMeta: {
      _id: string,
      title: string,
      slug: string,
      attribute: string,
      createdAt: string,
      updatedAt: string
  }
}

export interface ICattegoryAttributeItem {
  _id: string;
  title: string;
  slug: string;
  isDynamic: boolean;
  attributeMetas? : {
  _id : string ,
  title: string ,
  slug: string,
  }[];
}



