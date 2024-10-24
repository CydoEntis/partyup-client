import { useParams } from "react-router-dom";

type Props = {};

function CampaignPage({}: Props) {
	const { campaignId } = useParams();
	return <div>Campaign Page for {campaignId}</div>;
}

export default CampaignPage;
