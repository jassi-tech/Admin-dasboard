import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App } from 'antd';

export async function generateMetadata({ params }: { params: Promise<any> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Login' });
    return {
        title: t('title')
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<any>;
}) {
    const { locale } = await params;
    // const messages = await getMessages();
    const messages = await getMessages({ locale });

    return (
        <AntdRegistry>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1890ff',
                    },
                }}
            >
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <App>
                        {children}
                    </App>
                </NextIntlClientProvider>
            </ConfigProvider>
        </AntdRegistry>
    );
}
