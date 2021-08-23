# Action: GitHub Release Info

```yaml
- name: Fetch release info
  id: release
  uses: k15g/action-github-release-info@edge
  with:
    token: ${{ secrets.SUPER_GITHUB_TOKEN }}
    owner: k15g
    repo: action-github-release-info
```


## Inputs


### `token`

### `owner`

### `repo`


### `tag`

```yaml
- name: Fetch release info
  id: release
  uses: k15g/action-github-release-info@edge
  with:
    token: ${{ secrets.SUPER_GITHUB_TOKEN }}
    owner: k15g
    repo: action-github-release-info
    tag: v1.0.0
```
