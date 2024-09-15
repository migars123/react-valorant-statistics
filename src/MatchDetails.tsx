import React from "react";
import * as Types from "./Types";
import "./MatchDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

interface props {
	match: Types.Data | null;
	onClose: () => void;
}

const MatchDetails = ({ match, onClose }: props) => {
	console.log(match);
	if (match) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "unset";
	}

	return (
		<div className={match ? `matchDetailsRoot` : `matchDetailsRoot hiddenMatchDetails`} onClick={onClose}>
			<div className="matchDetailsMainContainer" onClick={(event) => event.stopPropagation()}>
				<div className="matchDetailsHeader">
					<div className="matchDetailsHeaderLeft">
						<div className="matchDetailsHeaderGamemode">
							<img
								src="https://media.valorant-api.com/gamemodes/96bd3920-4f36-d026-2b28-c683eb0bcac5/displayicon.png"
								alt=""
								className="game"
								height={32}
							/>
							<div className="topDownText topDownTextAutoSize">
								<p>Competitive</p>
								<p>Abyss</p>
							</div>
						</div>
						<div className="matchDetailsHeaderScore">
							<div className="topDownText topDownTextCentered winColored">
								<p>Team A</p>
								<p>11</p>
							</div>
							<div className="topDownText topDownTextCentered">
								<p>&nbsp;</p>
								<p>:</p>
							</div>
							<div className="topDownText topDownTextCentered loseColored">
								<p>Team B</p>
								<p>13</p>
							</div>
						</div>
						<div className="topDownText topDownTextAutoSize">
							<p>14/09/2024, 16:22</p>
							<p>38m 58s</p>
						</div>
						<div className="topDownText topDownTextAutoSize">
							<p>Average Rank</p>
							<p>
								<div className="imageText">
									<img
										src="https://trackercdn.com/cdn/tracker.gg/valorant/icons/tiersv2/16.png"
										alt=""
										height={16}
									/>
								<p>Platinum II</p>
                                </div>
							</p>
						</div>
					</div>
					<div className="matchDetailsHeaderRight">
						<div className="closeMatchDetailsButton">
							<FontAwesomeIcon icon={faXmark} className="closeMatchDetailsButtonIcon"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MatchDetails;
