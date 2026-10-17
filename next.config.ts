import type {NextConfig} from "next";
const repo = "giftrelay-20261017";
const isProd = process.env.NODE_ENV === "production";
const config: NextConfig = {output:"export", trailingSlash:true, images:{unoptimized:true}, basePath:isProd?`/${repo}`:"", assetPrefix:isProd?`/${repo}/`:""};
export default config;
