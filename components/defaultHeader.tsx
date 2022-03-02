import Head from "next/head";

export default function DefaultHeader() {
    return (
        <Head>
            <link rel="icon" href="/nora_favicon.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
            <meta name="description" content="National Minority AIDS Initiative Questionnaire" />
            <meta name="keywords" content="Health, Survey, NORA, Interview, AIDS, MAI, Substance Abuse, HIV Prevention" />
            <title>MAI Survey</title>
        </Head>
    )
}