import type { CallbackManagerForChainRun } from '@langchain/core/callbacks/manager';
import { Runnable, type RunnableConfig } from '@langchain/core/runnables';
import { AIGuardService, PangeaConfig } from 'pangea-node-sdk';

export class PangeaAiGuardRunnable<
  RunInput extends string = string,
> extends Runnable<RunInput, RunInput> {
  static lc_name() {
    return 'PangeaAiGuardRunnable';
  }

  lc_namespace = ['pangeacyber', 'runnables'];

  private client;

  constructor(token: string, domain = 'aws.us.pangea.cloud') {
    super();
    this.client = new AIGuardService(token, new PangeaConfig({ domain }));
  }

  async _invoke(
    input: RunInput,
    _config?: Partial<RunnableConfig>,
    _runManager?: CallbackManagerForChainRun
  ): Promise<RunInput> {
    // Run it through AI Guard.
    const redacted = await this.client.guardText({
      text: input,
      recipe: 'pangea_llm_response_guard',
    });
    if (!redacted.result?.prompt_text) {
      throw new Error('Failed to guard text.');
    }

    return redacted.result.prompt_text as RunInput;
  }

  override invoke(
    input: RunInput,
    config: Partial<RunnableConfig> = {}
  ): Promise<RunInput> {
    return this._callWithConfig(this._invoke, input, config);
  }
}
