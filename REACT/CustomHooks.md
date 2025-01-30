# Custom Hooks Documentation

## Table of Contents
- [useBlockConditionalRendering](#useblockconditionalrendering)
- [useCollection](#usecollection)
- [useInfiniteScroll](#useinfinitescroll)
- [useMergeRefs](#usemergerefs)
- [useMockCart](#usemockcart)
- [useMockProducts](#usemockproducts)
- [useNostoRecommendations](#usenostorecommendations)
- [useOrderDetails](#useorderdetails)
- [useProductOptions](#useproductoptions)
- [useProducts](#useproducts)
- [useRecommendations](#userecommendations)
- [useReviews](#usereviews)
- [useScrollDirection](#usescrolldirection)
- [useShop](#useshop)
- [useSortFilter](#usesortfilter)

## useBlockConditionalRendering

A hook for determining whether a block should be rendered based on visibility conditions.

```typescript
const { shouldShow, isLoading } = useBlockConditionalRendering(
  props: {
    appId: string;
    apiUrl: string;
  },
  block: PhoenixBlock
);
```

### Parameters
- `props`: Object containing appId and apiUrl
- `block`: PhoenixBlock object containing visibility conditions

### Returns
- `shouldShow`: boolean indicating if block should be rendered
- `isLoading`: boolean indicating loading state

## useCollection

A hook for fetching collection data.

```typescript
const { collections, specificCollection, loading, error } = useCollection({
  apiUrl: string;
  appId: string;
  collectionId?: string;
  collectionHandle?: string;
  language: string;
  getCollections?: boolean;
  limit?: number;
  metafields?: string;
});
```

### Parameters
- `apiUrl`: Base API URL
- `appId`: Application ID
- `collectionId`: Optional collection ID
- `collectionHandle`: Optional collection handle
- `language`: Language code
- `getCollections`: Boolean to fetch all collections
- `limit`: Number of collections to fetch
- `metafields`: Metafields string

### Returns
- `collections`: Array of collections
- `specificCollection`: Single collection if requested
- `loading`: Loading state
- `error`: Error state

## useInfiniteScroll

A hook for implementing infinite scroll functionality.

```typescript
const {
  data,
  error,
  isLoadingInitialData,
  isLoadingMore,
  isEmpty,
  isReachingEnd,
  ref,
  products,
  isLoading,
  isValidating
} = useInfiniteScroll({
  initialData: PageData;
  queryVariables: Record<string, any>;
  direction: "vertical" | "horizontal";
  productLimit: number;
  threshold?: number;
  interval?: number;
});
```

### Parameters
- `initialData`: Initial page data
- `queryVariables`: Query variables for fetching
- `direction`: Scroll direction
- `productLimit`: Maximum number of products
- `threshold`: Scroll threshold
- `interval`: Throttle interval

### Returns
- `data`: Array of page data
- `error`: Error state
- `isLoadingInitialData`: Initial loading state
- `isLoadingMore`: Loading more state
- `isEmpty`: Empty state
- `isReachingEnd`: End reached state
- `ref`: Reference for scroll container
- `products`: Array of products
- `isLoading`: Loading state
- `isValidating`: Validation state

## useMergeRefs

A utility hook for merging multiple refs.

```typescript
const mergedRef = useMergeRefs(...refs);
```

### Parameters
- `refs`: Array of refs to merge

### Returns
- `mergedRef`: Combined ref callback

## useMockCart

A hook for creating mock cart data.

```typescript
const { error, isLoading, cart } = useMockCart({
  apiUrl: string;
  appId: string;
  enabled: boolean;
  limit?: number;
});
```

### Parameters
- `apiUrl`: API URL
- `appId`: Application ID
- `enabled`: Enable mock cart
- `limit`: Product limit

### Returns
- `error`: Error state
- `isLoading`: Loading state
- `cart`: Mock cart data

## useNostoRecommendations

A hook for fetching Nosto product recommendations.

```typescript
const { recommendations, isLoading, error, isEmpty } = useNostoRecommendations(
  integrations: Integrations,
  baseURL: string,
  slotId?: string,
  recommendationsType?: NostoRecommendationsType,
  productIds?: string[],
  skip?: boolean,
  mockFallback?: boolean,
  mockFallbackAppId?: string
);
```

### Parameters
- `integrations`: Array of integrations
- `baseURL`: Base API URL
- `slotId`: Optional slot ID
- `recommendationsType`: Type of recommendations
- `productIds`: Array of product IDs
- `skip`: Skip recommendations
- `mockFallback`: Use mock data fallback
- `mockFallbackAppId`: Mock fallback app ID

### Returns
- `recommendations`: Array of recommended products
- `isLoading`: Loading state
- `error`: Error state
- `isEmpty`: Empty state

## useOrderDetails

A hook for fetching and managing order details.

```typescript
const { orderDetails } = useOrderDetails({
  variables: Record<string, any>;
  apiUrl: string;
  appId: string;
  language: string;
  country: string;
  mock?: boolean;
});
```

### Parameters
- `variables`: Order variables
- `apiUrl`: API URL
- `appId`: Application ID
- `language`: Language code
- `country`: Country code
- `mock`: Use mock data

### Returns
- `orderDetails`: Order details object

## useProductOptions

A hook for managing product variant options.

```typescript
const { selectedOptions, handleSelect, selectedVariant } = useProductOptions(
  variants: ProductVariant[],
  selectedVariantId?: string
);
```

### Parameters
- `variants`: Array of product variants
- `selectedVariantId`: Optional selected variant ID

### Returns
- `selectedOptions`: Currently selected options
- `handleSelect`: Function to handle option selection
- `selectedVariant`: Currently selected variant

## useProducts

A hook for fetching product data.

```typescript
const { products, error, isLoading } = useProducts({
  productIds: string[];
  productHandles: string[];
  baseURL: string;
  collection?: string;
  queryVariables?: Record<string, any>;
  fetcher?: Function;
  metafields?: MetafieldInput[];
  mock?: boolean;
  onlyAvailableProducts?: boolean;
});
```

### Parameters
- `productIds`: Array of product IDs
- `productHandles`: Array of product handles
- `baseURL`: Base API URL
- `collection`: Optional collection
- `queryVariables`: Query variables
- `fetcher`: Custom fetcher function
- `metafields`: Array of metafield inputs
- `mock`: Use mock data
- `onlyAvailableProducts`: Filter only available products

### Returns
- `products`: Array of products
- `error`: Error state
- `isLoading`: Loading state

## useRecommendations

A hook for fetching recommendations.

```typescript
const { products, collections, searches, isLoading, error } = useRecommendations({
  queryVariables: Record<string, any>;
  apiURL: string;
});
```

### Parameters
- `queryVariables`: Query variables
- `apiURL`: API URL

### Returns
- `products`: Recommended products
- `collections`: Recommended collections
- `searches`: Search recommendations
- `isLoading`: Loading state
- `error`: Error state

## useReviews

A hook for fetching product reviews.

```typescript
const { data, error, isLoading } = useReviews({
  baseURL: string;
  productId: string;
  provider: string;
  dataType: "summary" | "metadata" | "search";
  searchText: string;
  ratings: [number];
  topics: [string];
  sortBy: string;
  ascending: boolean;
  perPage: number;
  page: number;
  limit: number;
});
```

### Parameters
- `baseURL`: Base API URL
- `productId`: Product ID
- `provider`: Review provider
- `dataType`: Type of review data
- `searchText`: Search text
- `ratings`: Array of ratings
- `topics`: Array of topics
- `sortBy`: Sort field
- `ascending`: Sort direction
- `perPage`: Items per page
- `page`: Page number
- `limit`: Total limit

### Returns
- `data`: Review data
- `error`: Error state
- `isLoading`: Loading state

## useScrollDirection

A hook for detecting scroll direction.

```typescript
const { direction, scrollY } = useScrollDirection(threshold?: number);
```

### Parameters
- `threshold`: Scroll threshold (default: 100)

### Returns
- `direction`: Current scroll direction ("up" | "down" | null)
- `scrollY`: Current scroll position

## useShop

A hook for fetching shop data.

```typescript
const { shop, error, isLoading } = useShop({
  baseURL: string;
  fetcher?: Function;
});
```

### Parameters
- `baseURL`: Base API URL
- `fetcher`: Optional custom fetcher function

### Returns
- `shop`: Shop data
- `error`: Error state
- `isLoading`: Loading state

## useSortFilter

A hook for managing sort and filter functionality.

```typescript
const { sortFilterData, data, mutate, isLoading, isFilterLoading } = useSortFilter({
  initialData: PageData;
  queryVariables: Record<string, any>;
  dynamicKey?: Function;
});
```

### Parameters
- `initialData`: Initial page data
- `queryVariables`: Query variables
- `dynamicKey`: Optional dynamic key function

### Returns
- `sortFilterData`: Sort and filter data
- `data`: Filtered data
- `mutate`: Mutation function
- `isLoading`: Loading state
- `isFilterLoading`: Filter loading state