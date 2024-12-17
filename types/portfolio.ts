/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/portfolio.json`.
 */
export type Portfolio = {
  address: "7gyXGXDd3medjvNJA3ge7sYAkhyjy19vQ3kbMdZ9K4V6";
  metadata: {
    name: "portfolio";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "addNativeToken";
      discriminator: [105, 26, 39, 131, 139, 50, 89, 93];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "admin";
          docs: ["Confirm there is an admin account"];
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "tokenDetails";
          docs: [
            "The PDA storing details for native SOL.",
            'Seeds: [b"token_details", symbol.as_ref()]',
            "Space = TokenDetails::LEN"
          ];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  115
                ];
              },
              {
                kind: "arg";
                path: "symbol";
              }
            ];
          };
        },
        {
          name: "nativeVault";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  110,
                  97,
                  116,
                  105,
                  118,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          docs: ["Programs & Sysvars"];
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "symbol";
          type: {
            array: ["u8", 32];
          };
        }
      ];
    },
    {
      name: "addToken";
      discriminator: [237, 255, 26, 54, 56, 48, 68, 52];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "admin";
          docs: ["Confirm there is an admin account"];
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "portfolio";
          docs: ["The Program Account"];
        },
        {
          name: "tokenDetails";
          docs: [
            "The PDA storing details for native SOL.",
            'Seeds: [b"token_details", symbol.as_ref()]',
            "Space = TokenDetails::LEN"
          ];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  115
                ];
              },
              {
                kind: "arg";
                path: "symbol";
              }
            ];
          };
        },
        {
          name: "tokenMint";
          docs: ["The token mint for the supported token"];
        },
        {
          name: "vaultTokenAccount";
          docs: [
            "This creates the ATA for the `token_details` PDA and sets the program as its authority.",
            "This ATA will hold tokens deposited by users."
          ];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "portfolio";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "tokenMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "systemProgram";
          docs: ["Programs & Sysvars"];
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        }
      ];
      args: [
        {
          name: "symbol";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "tokenAddress";
          type: {
            option: "pubkey";
          };
        },
        {
          name: "decimals";
          type: "u8";
        }
      ];
    },
    {
      name: "banAccount";
      discriminator: [255, 213, 237, 233, 206, 168, 31, 90];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "adminAccount";
          docs: [
            "Check that the authority is an admin by verifying the admin PDA exists."
          ];
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "bannedAccount";
          docs: [
            "Create or update the BannedAccount PDA derived from the `account` pubkey provided.",
            "The seeds ensure uniqueness per banned user pubkey.",
            "If `reason` is `NotBanned`, you could allow closing or just updating."
          ];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [98, 97, 110, 110, 101, 100];
              },
              {
                kind: "arg";
                path: "account";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "account";
          type: "pubkey";
        },
        {
          name: "reason";
          type: {
            defined: {
              name: "banReason";
            };
          };
        }
      ];
    },
    {
      name: "deposit";
      discriminator: [242, 35, 198, 137, 82, 225, 242, 182];
      accounts: [
        {
          name: "user";
          signer: true;
        },
        {
          name: "tokenDetails";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  116,
                  111,
                  107,
                  101,
                  110,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  115
                ];
              },
              {
                kind: "arg";
                path: "symbol";
              }
            ];
          };
        },
        {
          name: "from";
          writable: true;
        },
        {
          name: "to";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        }
      ];
      args: [
        {
          name: "symbol";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "depositNative";
      discriminator: [13, 158, 13, 223, 95, 213, 28, 6];
      accounts: [
        {
          name: "user";
          docs: ["The user calling the function and paying the lamports."];
          writable: true;
          signer: true;
        },
        {
          name: "nativeVault";
          docs: ["The vault account that will hold the deposited SOL."];
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  110,
                  97,
                  116,
                  105,
                  118,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          docs: ["The program that can transfer lamports."];
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "globalConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "tokenList";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110, 95, 108, 105, 115, 116];
              },
              {
                kind: "const";
                value: [48];
              }
            ];
          };
        },
        {
          name: "nativeVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  110,
                  97,
                  116,
                  105,
                  118,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ];
              }
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "srcChainId";
          type: "u16";
        }
      ];
    },
    {
      name: "pauseDeposit";
      discriminator: [141, 148, 39, 15, 130, 177, 107, 21];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "globalConfig";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "admin";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "allowDeposit";
          type: "bool";
        }
      ];
    },
    {
      name: "removeToken";
      discriminator: [149, 134, 57, 61, 136, 2, 144, 145];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "admin";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "tokenList";
          writable: true;
        },
        {
          name: "tokenDetails";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [116, 111, 107, 101, 110];
              },
              {
                kind: "account";
                path: "token_details.symbol";
                account: "tokenDetails";
              }
            ];
          };
        },
        {
          name: "receiver";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "symbol";
          type: {
            array: ["u8", 32];
          };
        }
      ];
    },
    {
      name: "setMinDepositMultiplier";
      discriminator: [195, 131, 206, 12, 155, 195, 169, 181];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "globalConfig";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "admin";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "minDepositMultiplier";
          type: "u8";
        }
      ];
    },
    {
      name: "setNativeDepositsRestricted";
      discriminator: [238, 98, 118, 255, 163, 246, 154, 154];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "globalConfig";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "admin";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "nativeDepositsRestricted";
          type: "bool";
        }
      ];
    },
    {
      name: "setPortfolioBridge";
      discriminator: [127, 150, 103, 158, 68, 157, 10, 249];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "globalConfig";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ];
              }
            ];
          };
        },
        {
          name: "admin";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        }
      ];
      args: [
        {
          name: "portfolioBridge";
          type: "pubkey";
        }
      ];
    },
    {
      name: "unbanAccount";
      discriminator: [197, 25, 198, 40, 223, 250, 239, 250];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "adminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 100, 109, 105, 110];
              },
              {
                kind: "account";
                path: "authority";
              }
            ];
          };
        },
        {
          name: "bannedAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [98, 97, 110, 110, 101, 100];
              },
              {
                kind: "arg";
                path: "userPubkey";
              }
            ];
          };
        },
        {
          name: "receiver";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "account";
          type: "pubkey";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "admin";
      discriminator: [244, 158, 220, 65, 8, 73, 4, 65];
    },
    {
      name: "bannedAccount";
      discriminator: [72, 237, 40, 155, 34, 49, 93, 63];
    },
    {
      name: "globalConfig";
      discriminator: [149, 8, 156, 202, 160, 252, 176, 217];
    },
    {
      name: "nativeVault";
      discriminator: [231, 152, 115, 157, 25, 85, 252, 69];
    },
    {
      name: "tokenDetails";
      discriminator: [83, 49, 200, 250, 222, 246, 143, 58];
    },
    {
      name: "tokenList";
      discriminator: [145, 167, 153, 173, 5, 187, 157, 150];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "invalidAmount";
      msg: "Invalid amount.";
    },
    {
      code: 6001;
      name: "invalidVaultOwner";
      msg: "Invalid vault owner.";
    },
    {
      code: 6002;
      name: "tokenNotSupported";
      msg: "Token not supported.";
    },
    {
      code: 6003;
      name: "tokenNotFound";
      msg: "Token not found.";
    },
    {
      code: 6004;
      name: "invalidMint";
      msg: "Invalid mint.";
    },
    {
      code: 6005;
      name: "invalidAccountOwner";
      msg: "Invalid account owner.";
    }
  ];
  types: [
    {
      name: "admin";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "banReason";
      type: {
        kind: "enum";
        variants: [
          {
            name: "notBanned";
          },
          {
            name: "ofac";
          },
          {
            name: "abuse";
          },
          {
            name: "terms";
          }
        ];
      };
    },
    {
      name: "bannedAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "reason";
            type: {
              defined: {
                name: "banReason";
              };
            };
          }
        ];
      };
    },
    {
      name: "globalConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "allowDeposit";
            type: "bool";
          },
          {
            name: "minDepositMultiplier";
            type: "u8";
          },
          {
            name: "nativeDepositsRestricted";
            type: "bool";
          },
          {
            name: "srcChainId";
            type: "u16";
          },
          {
            name: "portfolioBridge";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "nativeVault";
      type: {
        kind: "struct";
        fields: [
          {
            name: "totalDeposited";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "tokenDetails";
      type: {
        kind: "struct";
        fields: [
          {
            name: "decimals";
            type: "u8";
          },
          {
            name: "symbol";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "tokenAddress";
            type: {
              option: "pubkey";
            };
          }
        ];
      };
    },
    {
      name: "tokenList";
      type: {
        kind: "struct";
        fields: [
          {
            name: "nextPage";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "tokens";
            type: {
              vec: {
                array: ["u8", 32];
              };
            };
          }
        ];
      };
    }
  ];
};
