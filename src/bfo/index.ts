import type { BFOResponse } from "./schemas/index.ts";

const BASE_URL = "https://bo.nalog.gov.ru";

export async function getOrganizationBFO(id: number): Promise<BFOResponse> {
	const url = new URL(`/nbo/organizations/${id}/bfo`, BASE_URL);

	const response = await fetch(url.toString());

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
}
