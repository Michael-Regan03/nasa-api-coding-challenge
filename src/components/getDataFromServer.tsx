type HttpMethod = "GET" | "POST";

interface FetchConfig {
  endpoint: string;
  method: HttpMethod;
  params?: Record<string, string | Date>;
  headers?: Record<string, string>;
}

export async function getDataFromServer<T = any>(
  config: FetchConfig
): Promise<T> {
  const { endpoint, method, params = {}, headers = {} } = config;
  const processedParams: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    processedParams[key] =
      value instanceof Date
        ? value.toISOString().split("T")[0] // Format as YYYY-MM-DD
        : value;
  });

  console.log("params", params);

  // Configure request
  const requestConfig: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  let url = `/api/v1/${endpoint}`;

  if (method === "GET") {
    // Add parameters to URL for GET requests
    const queryParams = new URLSearchParams();
    Object.entries(processedParams).forEach(([key, value]) => {
      queryParams.append(key, value);
    });
    url += `?${queryParams.toString()}`;
    console.log("GET URL:", url);
  } else {
    // Add parameters to body for POST requests
    requestConfig.body = JSON.stringify(processedParams);
  }

  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}
