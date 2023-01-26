import path from "path";

class Client {
  private onError: (error: Error) => void;

  constructor(onError: (error: Error) => void) {
    this.onError = onError;
  }

  async request<T>(url: string, options?: RequestInit): Promise<unknown> {
    try {
      const response = await fetch(this.join(url), options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    } catch (error) {
      this.onError(error as Error);
      throw error;
    }
  }

  async get<T>(url: string) {
    return await this.request<T>(url);
  }

  async post<T>(url: string, body: object) {
    return await this.request<T>(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  async put<T>(url: string, body: object) {
    return await this.request<T>(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  async delete<T>(url: string) {
    return await this.request<T>(url, {
      method: "DELETE",
    });
  }

  private join(url: string) {
    return path.join("api", url);
  }
}

export const client = new Client((error: Error) => console.log(error));
