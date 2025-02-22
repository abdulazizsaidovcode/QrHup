import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalRequest } from '../../hooks/GlobalHook';
import {
    MerchantGetOne,
    MerchantQrs,
    MerchantStatistic,
    MerchantTerminal,
    MerchantTransactions,
} from '../../hooks/url';
import {
    Box,
    Button,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material';
import { IoChevronBackOutline } from 'react-icons/io5';
import { Pagination } from 'antd';
import { useTranslation } from "react-i18next";

export default function MerchantDetials() {
    // States
    const [pageQr, setPageQr] = useState(0);
    const [pageTerminal, setPageTerminal] = useState(0);
    const [pageTransaction, setPageTransaction] = useState(0);
    const [selectedTab, setSelectedTab] = useState(0);
    const handleChange = (event: any | null, newValue: number) => {
        setSelectedTab(newValue);
    };
    const { id } = useParams<string>();
    const { response: resGet, globalDataFunc: GetData } = useGlobalRequest(
        `${MerchantGetOne}id=${id}`,
        'GET',
    );
    const { response: statisticsGet, globalDataFunc: GetSattistics } =
        useGlobalRequest(`${MerchantStatistic}merchantId=${id}`, 'GET');

    const { response: QrGet, globalDataFunc: GetqrCall } = useGlobalRequest(
        `${MerchantQrs}merchantId=${id}&page=${pageQr}&size=10`,
        'GET',
    );

    // const { response: MerchantGet, globalDataFunc: MerchantEffect } =
    //     useGlobalRequest(
    //         `${MerchantPartner}merchantId=${id}&page=${pageMerchant}&size=10`,
    //         'GET',
    //     );
    const { response: TerminalGet, globalDataFunc: TerminalEffect } =
        useGlobalRequest(
            `${MerchantTerminal}merchantId=${id}&page=${pageTerminal}&size=10`,
            'GET',
        );

    const { response: TransactionGet, globalDataFunc: TransactionEffect } =
        useGlobalRequest(
            `${MerchantTransactions}merchantId=${id}&page=${pageTransaction}&size=10`,
            'GET',
        );

    const navigator = useNavigate();
    useEffect(() => {
        GetData();
        GetSattistics();
        GetqrCall();
        // MerchantEffect();
        TerminalEffect();
        TransactionEffect();
    }, [id]);
    const GettingDatass = resGet;
    const { t } = useTranslation()
    return (
        <div className="bg-gray-100  flex flex-col items-center">
            <div className="flex justify-between mb-3 w-full">
                <Button
                    className="outline-none border-none hover:bg-transparent"
                    onClick={() => {
                        navigator(-1);
                    }}
                >
                    <IoChevronBackOutline color="black" size={30} />
                </Button>
            </div>
            <div className="w-full ">
                <div className="flex justify-between gap-9">
                    <div className="w-full bg-white shadow-xl rounded-xl p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("Name")}</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.name || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("PartnerName")}</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.partnerName || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Ext-ID</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.extId || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("innn")}</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.inn || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("Adrres")}</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.address || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("mfo")}</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.mfo || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("Account")}</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.account || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("Status")}</p>
                                <p className="text-sm font-semibold uppercase">
                                    {GettingDatass?.active ? 'NOT ACTIVE' : 'active'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">{t("CreatedTime")}</p>
                                <p className="text-sm font-semibold uppercase">
                                    {GettingDatass?.createdAt ? GettingDatass?.createdAt.slice(0, 10) : ''}
                                    {' '}
                                    {GettingDatass?.createdAt ? GettingDatass?.createdAt.slice(11, 16) : ''}
                                </p>
                            </div>
                            {/* <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Expire</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.expire || '-'}
                                </p>
                            </div>
                            <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                                <p className="text-sm font-semibold">Status</p>
                                <p className="text-sm font-semibold">
                                    {GettingDatass?.status || '-'}
                                </p>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-[40%] bg-white shadow-md rounded-xl border-l-2 flex flex-col p-6 gap-5">
                        {/* <div className="flex justify-between pb-2  border-b-2 border-gray-500">
                            <p className="text-sm font-semibold">{t("Merchants")}:</p>
                            <p className="text-sm font-semibold">
                                {statisticsGet?.merchantCount || '0'}
                            </p>
                        </div> */}
                        <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                            <p className="text-sm font-semibold">{t("Terminals")}:</p>
                            <p className="text-sm font-semibold">
                                {statisticsGet?.terminalCount || '0'}
                            </p>
                        </div>
                        <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                            <p className="text-sm font-semibold">{t("QRS")}:</p>
                            <p className="text-sm font-semibold">
                                {statisticsGet?.qrCount || '-'}
                            </p>
                        </div>
                        <div className="flex justify-between pb-2 border-b-2 border-gray-500">
                            <p className="text-sm font-semibold">{t("QR's")}:</p>
                            <p className="text-sm font-semibold flex flex-col items-center justify-center">
                                <span>
                                    {t("Count")}:
                                    {statisticsGet?.transactionCount || '0'},
                                </span>
                                <span>{t("Amount")}: {statisticsGet?.transactionAmount || '0'}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 5,
                    boxShadow: 2,
                    marginTop: 3,
                    padding: 3,
                }}
            >
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="Qr" />
                    {/* <Tab label="Merchant" /> */}
                    <Tab label={t("Terminal")} />
                    <Tab label={t("Transactions")} />
                </Tabs>
                <Box sx={{ p: 3, overflow: 'auto' }}>
                    {selectedTab === 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Table
                                className="bg-white"
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow className="bg-gray-300">
                                        <TableCell>No</TableCell>
                                        <TableCell className="min-w-[250px] border-l" align="left">
                                            {t("Partner")}
                                        </TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">
                                            {t("Account")}
                                        </TableCell>
                                        <TableCell className="min-w-[150px] border-l" align="left">
                                            {t("Type")}
                                        </TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">
                                            {t("CreatedTime")}
                                        </TableCell>
                                        <TableCell className="min-w-[200px] border-l" align="left">
                                            {t("ExpireTime")}
                                        </TableCell>
                                        <TableCell className="min-w-[160px] border-l" align="left">
                                            {t("Status")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {QrGet?.object ? QrGet?.object?.map((partner: any, index: number) => (
                                        <TableRow key={partner.id || index}>
                                            <TableCell>{pageQr * 10 + index + 1}</TableCell>
                                            <TableCell align="left">
                                                {partner.partner || '-'}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.amount || '-'}
                                            </TableCell>
                                            <TableCell align="left">{partner.type || '-'}</TableCell>
                                            <TableCell align="left">
                                                {partner.createdAt ? partner.createdAt.slice(0, 10) : ' '}
                                                {' '}
                                                {partner.createdAt ? partner.createdAt.slice(11, 16) : ' '}
                                            </TableCell>
                                            <TableCell align="left">
                                                {partner.expire || '-'}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    fontSize={15}
                                                    className="bg-[#327bf0] text-white  text-center p-3 rounded-full "
                                                >
                                                    {partner.status}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )) :
                                        <TableCell colSpan={10}>
                                            <Typography color="info" textAlign="center">
                                                {t("MerchantsQrNotFound")}
                                            </Typography>
                                        </TableCell>
                                    }
                                </TableBody>
                            </Table>
                            <Pagination
                                defaultCurrent={1}
                                current={pageQr + 1}
                                total={QrGet?.totalElements || 0}
                                // pageSize={size || 10}
                                onChange={async (pageNumber: number) => {
                                    await setPageQr(pageNumber - 1);
                                    await QrGet();
                                }}
                                showSizeChanger={false}
                            />
                        </Box>
                    )}
                    {selectedTab === 1 && (
                        <Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Table
                                    className="bg-white"
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow className="bg-gray-300">
                                            <TableCell>No</TableCell>
                                            <TableCell
                                                className="min-w-[250px] border-l"
                                                align="left"
                                            >
                                                {t("TerminalName")}
                                            </TableCell>

                                            <TableCell
                                                className="min-w-[200px] border-l"
                                                align="left"
                                            >
                                                {t("Name")}
                                            </TableCell>
                                            <TableCell
                                                className="min-w-[150px] border-l" 
                                                align="left"
                                            >
                                                {t("mcc")} 
                                            </TableCell>
                                            <TableCell
                                                className="min-w-[160px] border-l"
                                                align="left"
                                            > 
                                                {t("Status")}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {TerminalGet?.object ? TerminalGet?.object?.map((terminal: any, index: number) => (
                                            <TableRow key={terminal.id || index}>
                                                <TableCell>{pageQr * 10 + index + 1}</TableCell>
                                                <TableCell align="left">
                                                    {terminal.name || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {terminal.merchantName || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {terminal.mcc || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography
                                                        fontSize={15}
                                                        className={` uppercase  text-center p-3 rounded-full ${terminal.active ? 'text-red-500 ' : 'text-white bg-[#327bf0]'} `}
                                                    >
                                                        {terminal.active ? 'Inactive' : 'active'}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : 
                                    <TableCell colSpan={10}>
                                            <Typography color="info" textAlign="center">
                                                {t("MerchantsTerminalNotFound")}
                                            </Typography>
                                        </TableCell>
                                    }
                                    </TableBody>
                                </Table>
                                <Pagination
                                    defaultCurrent={1}
                                    current={pageTerminal + 1}
                                    total={TerminalGet?.totalElements || 0}
                                    // pageSize={size || 10}
                                    onChange={async (pageNumber: number) => {
                                        await setPageTerminal(pageNumber - 1);
                                        await TerminalEffect();
                                    }}
                                    showSizeChanger={false}
                                />
                            </Box>
                        </Typography>
                    )}
                    {selectedTab === 2 && (
                        <Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Table
                                    className="bg-white"
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow className="bg-gray-300">
                                            <TableCell>No</TableCell>
                                            <TableCell
                                                className="min-w-[250px] border-l"
                                                align="left"
                                            >
                                                {t("Bank")}
                                            </TableCell>
                                            <TableCell
                                                className="min-w-[200px] border-l"
                                                align="left"
                                            >
                                                {t("Sender")}
                                            </TableCell>
                                            <TableCell
                                                className="min-w-[150px] border-l"
                                                align="left"
                                            >
                                                {t("Rate")}
                                            </TableCell>
                                            <TableCell
                                                className="min-w-[160px] border-l"
                                                align="left"
                                            >
                                                {t("Currency")}
                                            </TableCell>
                                            <TableCell
                                                className="min-w-[160px] border-l"
                                                align="left"
                                            >
                                                {t("Amount")}
                                            </TableCell>
                                            <TableCell
                                                className="min-w-[160px] border-l"
                                                align="left"
                                            >
                                                {t("ServiceFee")}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {TransactionGet?.object ? TransactionGet?.object?.map((transaction: any, index: number) => (
                                            <TableRow key={transaction.id || index}>
                                                <TableCell>{pageQr * 10 + index + 1}</TableCell>
                                                <TableCell align="left">
                                                    {transaction.bank || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {transaction.sender || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {transaction.rate || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {transaction.currency || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {transaction.amount || '-'}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {transaction.serviceFee || '-'}
                                                </TableCell>
                                            </TableRow>
                                        )) : 
                                        <TableCell colSpan={10}>
                                            <Typography color="info" textAlign="center">
                                                {t("MerchantsTransactionNotFound")}
                                            </Typography>
                                        </TableCell>
                                        }
                                    </TableBody>
                                </Table>
                                <Pagination
                                    defaultCurrent={1}
                                    current={pageTransaction + 1}
                                    total={TransactionGet?.totalElements || 0}
                                    // pageSize={size || 10}
                                    onChange={async (pageNumber: number) => {
                                        await setPageTransaction(pageNumber - 1);
                                        await TransactionEffect();
                                    }}
                                    showSizeChanger={false}
                                />
                            </Box>
                        </Typography>
                    )}
                </Box>
            </Box>
        </div>
    );
}
