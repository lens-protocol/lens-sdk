export class LensError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class UnmetAccessCriteriaError extends LensError {
  constructor(message = 'You do not fulfill the access criteria to decrypt this object.') {
    super(100, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class EncodingError extends LensError {
  constructor(message = 'The data could not be encoded.') {
    super(101, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class AccountError extends LensError {
  constructor(message = 'No connected account found.') {
    super(102, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class ProviderError extends LensError {
  constructor(message = 'No ethers provider found.') {
    super(103, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class UnsupportedNetworkError extends LensError {
  constructor(network: string | number | undefined) {
    super(104, `Network ${network} is not supported.`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class ConnectivityError extends LensError {
  constructor(message = 'Could not connect to the network.') {
    super(105, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class InvalidMetadataError extends LensError {
  constructor(message: string) {
    super(106, message ? `The metadata is invalid. ${message}` : 'The metadata is invalid.');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class APIError extends LensError {
  constructor(message: string) {
    super(107, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class BadRequestError extends LensError {
  constructor(message: string) {
    super(108, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class InvalidAccessCriteriaError extends LensError {
  constructor(message = 'You provided unsupported access control criteria.') {
    super(109, message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class EnvironmentError extends LensError {
  constructor(message?: string) {
    super(109, message ? `${message}` : 'The provided Lens environment is invalid.');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class LibraryError extends LensError {
  constructor(message: string) {
    super(110, message ? message : 'A library is missing');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class SignerError extends LensError {
  constructor(input?: string) {
    super(110, `Signer missing or misconfigured. ${input}`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class ChainIdError extends LensError {
  constructor(chainId: number) {
    super(111, `Unsupported chainId: ${chainId}! Please connect to Polygon or Mumbai.`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class ValidationError extends LensError {
  constructor(input: any) {
    super(112, `Invalid input: ${JSON.stringify(input)}!`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class UploadError extends LensError {
  constructor(reason: string) {
    super(113, `Error while uploading metadata: ${reason}`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}

export class InvalidAddressError extends LensError {
  constructor(address: string) {
    super(114, `Invalid address: ${address}`);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LensError.prototype);
  }
}
