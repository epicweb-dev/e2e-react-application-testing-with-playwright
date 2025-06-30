import { test as testBase } from '@playwright/test'
import { createNetworkFixture, type NetworkFixture } from '@msw/playwright'

interface Fixtures {
	network: NetworkFixture
}

export const test = testBase.extend<Fixtures>({
	network: createNetworkFixture(),
})
