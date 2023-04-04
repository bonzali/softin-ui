import { createAxiosInstance } from "./api";
import axios, { AxiosInstance } from "src/apiClient/api";

describe("createAxiosInstance", () => {
    let instance;

    beforeEach(() => {
        instance = createAxiosInstance();
    });

    it("should create an instance of axios", () => {
        expect(instance).toBeInstanceOf(axios);
    });

    it("should merge meta with default meta", async () => {
        const config = { meta: { shouldResolve: false } };
        instance = createAxiosInstance(config);
        const requestInterceptor = instance.interceptors.request.handlers[0];
        const configWithMeta = await requestInterceptor.fulfilled({ meta: { appendSlash: true } });
        expect(configWithMeta.meta).toEqual({ appendSlash: true, shouldResolve: false });
    });

    it("should append a slash to urls for GET and POST requests", async () => {
        const config = { url: "https://example.com/api/v1", method: "get", meta: { appendSlash: true } };
        const requestInterceptor = instance.interceptors.request.handlers[0];
        const configWithMeta = await requestInterceptor.fulfilled(config);
        expect(configWithMeta.url).toEqual(`${config.url}/`);
    });

    it("should add headers with getAuthHeader function", async () => {
        const config = { meta: { getAuthHeader: () => ({ Authorization: "Bearer token" }) } };
        instance = createAxiosInstance(config);
        const requestInterceptor = instance.interceptors.request.handlers[0];
        const configWithMeta = await requestInterceptor.fulfilled({});
        expect(configWithMeta.headers).toEqual({
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer token",
        });
    });

    it("should resolve response.data.data when meta.shouldResolve is true", async () => {
        const response = { data: { data: { name: "John" } }, config: { meta: { shouldResolve: true } } };
        const responseInterceptor = instance.interceptors.response.handlers[0];
        const data = await responseInterceptor.fulfilled(response);
        expect(data).toEqual({ name: "John" });
    });

    it("should throw ApiError when error.response exists", async () => {
        const error = { response: { status: 404, data: { message: "Not found" } }, config: {} };
        const responseInterceptor = instance.interceptors.response.handlers[0];
        await expect(responseInterceptor.rejected(error)).rejects.toThrowError("Not found");
    });

    it("should throw default error when error.response does not exist", async () => {
        const error = { config: {} };
        const responseInterceptor = instance.interceptors.response.handlers[0];
        await expect(responseInterceptor.rejected(error)).rejects.toThrowError("Internal Server Error");
    });
});