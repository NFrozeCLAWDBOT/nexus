# Nexus

The hub site for the NFROZE collection — a cinematic, scroll-driven showcase of five DevSecOps webapps at [nfroze.co.uk](https://nfroze.co.uk).

## The Collection

| App | Description | URL |
|-----|-------------|-----|
| **Sentinel** | Real-time vulnerability intelligence dashboard | [sentinel.nfroze.co.uk](https://sentinel.nfroze.co.uk) |
| **Oracle** | Guided LLM security assessment framework | [oracle.nfroze.co.uk](https://oracle.nfroze.co.uk) |
| **Bastion** | Dependency risk analyser | [bastion.nfroze.co.uk](https://bastion.nfroze.co.uk) |
| **Aegis** | AI regulatory compliance mapping | [aegis.nfroze.co.uk](https://aegis.nfroze.co.uk) |
| **Verdant** | AWS security posture dashboard | [verdant.nfroze.co.uk](https://verdant.nfroze.co.uk) |

## Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Animation:** GSAP (ScrollTrigger, ScrollSmoother, SplitText)
- **Infrastructure:** S3 static hosting, Cloudflare DNS + SSL
- **Deployment:** Terraform

## Build

```bash
npm install
npm run dev        # Development server
npm run build      # Production build
```

## Deploy

```bash
cd terraform && terraform apply
npm run build
aws s3 sync dist/ s3://nfroze.co.uk/ --delete --exclude "*.mp4" --exclude "*.mp3"
```
