import React, { useEffect } from "react";
import useCampaignStore from "../../stores/usePartyStore";
import { Link } from "react-router-dom";
import { Stack } from "@mantine/core";

type Props = {};

function PartiesPage({}: Props) {
	const { getCampaigns, campaigns } = useCampaignStore();

	useEffect(() => {
		const fetchCampaigns = async () => {
			await getCampaigns();
		};
		fetchCampaigns();
	}, []);

	return (
		<div className="p-8">
			<Stack gap={8}>
				{campaigns &&
					campaigns.items.map((campaign) => (
						<Link
							key={campaign.id}
							to={`/campaigns/${campaign.id}/quests`}
						>
							{campaign.title}
						</Link>
					))}
			</Stack>
		</div>
	);
}

export default PartiesPage;
