import React, { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';

const LayerDrillDown = () => {
  const [drillPath, setDrillPath] = useState([]); // ['company'] for tracking drill level
  const [expandedLayers, setExpandedLayers] = useState({}); // { layerId: productId } for tracking which product is expanded in each layer

  const data = {
    companies: {
      salesforce: {
        name: 'Salesforce',
        color: 'blue',
        products: {
          sources: [
            { id: 'sales-cloud', name: 'Sales Cloud', capabilities: ['CRM Data', 'Account Management', 'Opportunity Tracking', 'Contact Management'] },
            { id: 'service-cloud', name: 'Service Cloud', capabilities: ['Case Management', 'Service Data', 'Knowledge Base'] },
            { id: 'marketing-cloud', name: 'Marketing Cloud', capabilities: ['Campaign Data', 'Email Engagement', 'Customer Journeys'] },
            { id: 'commerce-cloud', name: 'Commerce Cloud', capabilities: ['E-commerce Data', 'Product Catalog', 'Order History'] },
            { id: 'data-cloud', name: 'Data Cloud', capabilities: ['Unified Customer Data', 'Partner Data', 'Cloud Storage'] }
          ],
          collection: [
            { id: 'data-cloud', name: 'Data Cloud', capabilities: ['Pre-built Connectors', 'Bulk API', 'Streaming Ingestion', 'CDC'] },
            { id: 'salesforce-connect', name: 'Salesforce Connect', capabilities: ['External Objects', 'API Integration', 'Real-time Access'] },
            { id: 'data-loader', name: 'Data Loader', capabilities: ['Batch Import/Export', 'CSV Processing'] }
          ],
          organization: [
            { id: 'data-cloud', name: 'Data Cloud', capabilities: ['Data Modeling', 'Identity Resolution', 'Semantic Layer', 'Data Quality', 'Governance'] },
            { id: 'custom-objects', name: 'Custom Objects & Fields', capabilities: ['Schema Design', 'Relationships', 'Validation Rules'] }
          ],
          analysis: [
            { id: 'crm-analytics', name: 'CRM Analytics', capabilities: ['Dashboards', 'Embedded Analytics', 'Einstein Discovery', 'Mobile Analytics'] },
            { id: 'reports-dashboards', name: 'Reports & Dashboards', capabilities: ['Standard Reporting', 'Custom Reports', 'Report Subscriptions'] },
            { id: 'einstein-discovery', name: 'Einstein Discovery', capabilities: ['Predictive Modeling', 'AI Insights', 'Automated Analysis'] }
          ],
          action: [
            { id: 'flow-builder', name: 'Flow Builder', capabilities: ['Workflow Automation', 'Process Automation', 'Alerts'] },
            { id: 'einstein-copilot', name: 'Einstein Copilot', capabilities: ['Conversational AI', 'Agent Assistance'] },
            { id: 'agentforce', name: 'Agentforce', capabilities: ['Autonomous Agents', 'AI-Driven Actions'] },
            { id: 'apis', name: 'Salesforce APIs', capabilities: ['REST API', 'SOAP API', 'Bulk API', 'Data Writeback'] }
          ]
        }
      },
      tableau: {
        name: 'Tableau',
        color: 'orange',
        products: {
          sources: [
            { id: 'connectors', name: 'Tableau Connectors', capabilities: ['Database Connectors', 'Cloud Data Sources', 'Web Data'] }
          ],
          collection: [
            { id: 'connectors', name: 'Tableau Connectors', capabilities: ['70+ Native Connectors', 'Live Connections', 'Extract Refresh'] },
            { id: 'prep', name: 'Tableau Prep', capabilities: ['Data Ingestion', 'File Upload', 'Flow-based ETL'] }
          ],
          organization: [
            { id: 'data-models', name: 'Tableau Data Models', capabilities: ['Relationships', 'Data Blending', 'LOD Calculations'] },
            { id: 'semantic-layer', name: 'Tableau Semantic Layer', capabilities: ['Unified Metrics', 'Business Logic', 'Centralized Definitions'] },
            { id: 'catalog', name: 'Tableau Catalog', capabilities: ['Data Cataloging', 'Lineage Tracking', 'Impact Analysis'] },
            { id: 'prep', name: 'Tableau Prep', capabilities: ['Data Transformation', 'Cleaning', 'Shaping'] }
          ],
          analysis: [
            { id: 'desktop', name: 'Tableau Desktop', capabilities: ['Interactive Dashboards', 'Ad-hoc Analysis', 'Visual Analytics'] },
            { id: 'cloud', name: 'Tableau Cloud', capabilities: ['Web-based Analytics', 'Collaboration', 'Sharing'] },
            { id: 'tableau-next', name: 'Tableau Next', capabilities: ['AI-Powered Insights', 'Smart Recommendations', 'Automated Analysis'] },
            { id: 'mobile', name: 'Tableau Mobile', capabilities: ['Mobile Analytics', 'Offline Access'] }
          ],
          action: [
            { id: 'alerts', name: 'Tableau Alerts', capabilities: ['Threshold Alerts', 'Data-driven Alerts'] },
            { id: 'subscriptions', name: 'Tableau Subscriptions', capabilities: ['Scheduled Reports', 'Email Delivery'] },
            { id: 'extensions', name: 'Tableau Extensions', capabilities: ['Data Writeback', 'Custom Actions'] }
          ]
        }
      },
      slack: {
        name: 'Slack',
        color: 'purple',
        products: {
          sources: [
            { id: 'slack', name: 'Slack Platform', capabilities: ['Messages', 'Channels', 'Files', 'User Activity'] }
          ],
          collection: [
            { id: 'apis', name: 'Slack APIs', capabilities: ['Events API', 'Web API', 'Real-time Messaging'] }
          ],
          organization: [
            { id: 'canvas', name: 'Slack Canvas', capabilities: ['Document Organization', 'Knowledge Management'] }
          ],
          analysis: [
            { id: 'analytics', name: 'Slack Analytics', capabilities: ['Usage Analytics', 'Collaboration Metrics'] },
            { id: 'canvas', name: 'Slack Canvas', capabilities: ['Collaborative Analysis', 'Shared Insights'] }
          ],
          action: [
            { id: 'notifications', name: 'Slack Notifications', capabilities: ['Smart Alerts', 'Channel Messages', 'DMs'] },
            { id: 'workflow-builder', name: 'Workflow Builder', capabilities: ['No-code Automation', 'Custom Workflows'] },
            { id: 'slack-ai', name: 'Slack AI', capabilities: ['AI Search', 'Summaries', 'Agent Actions'] }
          ]
        }
      },
      mulesoft: {
        name: 'MuleSoft',
        color: 'green',
        products: {
          sources: [
            { id: 'anypoint', name: 'MuleSoft Anypoint', capabilities: ['API Gateway', 'External Systems', 'Enterprise Apps'] }
          ],
          collection: [
            { id: 'anypoint', name: 'Anypoint Platform', capabilities: ['API Integration', 'Pre-built Connectors', '400+ Integrations'] },
            { id: 'datagraph', name: 'MuleSoft DataGraph', capabilities: ['Real-time Streaming', 'Event Processing', 'Unified API'] },
            { id: 'cdc', name: 'MuleSoft CDC', capabilities: ['Change Data Capture', 'Database Replication'] }
          ],
          organization: [
            { id: 'composer', name: 'MuleSoft Composer', capabilities: ['Data Transformation', 'Mapping', 'Orchestration'] }
          ],
          analysis: [
            { id: 'monitoring', name: 'Anypoint Monitoring', capabilities: ['API Analytics', 'Performance Metrics'] }
          ],
          action: [
            { id: 'rpa', name: 'MuleSoft RPA', capabilities: ['Process Automation', 'Robotic Automation'] },
            { id: 'apis', name: 'MuleSoft APIs', capabilities: ['Data Writeback', 'Bidirectional Sync', 'Reverse ETL'] }
          ]
        }
      }
    }
  };

  const layers = [
    { id: 'sources', name: 'Sources', color: 'blue' },
    { id: 'collection', name: 'Collection', color: 'purple' },
    { id: 'organization', name: 'Organization', color: 'green' },
    { id: 'analysis', name: 'Analysis', color: 'orange' },
    { id: 'action', name: 'Action', color: 'red' }
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', light: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
    purple: { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', light: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
    green: { bg: 'bg-green-500', hover: 'hover:bg-green-600', light: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
    orange: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', light: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
    red: { bg: 'bg-red-500', hover: 'hover:bg-red-600', light: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
  };

  const handleCompanyClick = (companyId) => {
    setDrillPath([companyId]);
  };

  const handleProductClick = (layerId, productId) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layerId]: prev[layerId] === productId ? null : productId // Toggle: if same product clicked, collapse it
    }));
  };

  const handleReset = () => {
    setDrillPath([]);
    setExpandedLayers({});
  };

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      // Clicked on Companies - reset everything
      setDrillPath([]);
      setExpandedLayers({});
    } else {
      // Clicked on company - keep company but clear expanded products
      setDrillPath(drillPath.slice(0, index + 1));
      setExpandedLayers({});
    }
  };

  const getCurrentLevel = () => {
    if (drillPath.length === 0) return 'companies';
    return 'products';
  };

  const getCurrentCompany = () => {
    if (drillPath.length === 0) return null;
    return data.companies[drillPath[0]];
  };

  const renderColumnContent = (layerId) => {
    const level = getCurrentLevel();
    const company = getCurrentCompany();
    const expandedProductId = expandedLayers[layerId];

    if (level === 'companies') {
      // Show all companies
      return Object.entries(data.companies).map(([companyId, companyData]) => {
        const colors = colorClasses[companyData.color];
        const hasProducts = companyData.products[layerId] && companyData.products[layerId].length > 0;
        
        if (!hasProducts) return null;

        return (
          <div
            key={companyId}
            onClick={() => handleCompanyClick(companyId)}
            className={`${colors.light} border-2 ${colors.border} rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105 flex-1 flex flex-col justify-center`}
          >
            <h3 className={`font-bold text-xl ${colors.text}`}>{companyData.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{companyData.products[layerId].length} products</p>
          </div>
        );
      });
    }

    if (level === 'products') {
      // Show products from selected company for this layer, or capabilities if expanded
      const products = company.products[layerId] || [];
      const colors = colorClasses[company.color];

      // If a product is expanded in this layer, show its capabilities
      if (expandedProductId) {
        const selectedProduct = products.find(p => p.id === expandedProductId);

        if (!selectedProduct) {
          return (
            <div className="text-center text-gray-400 text-sm italic py-4">
              No capabilities in this layer
            </div>
          );
        }

        return (
          <>
            {/* Back button */}
            <button
              onClick={() => handleProductClick(layerId, expandedProductId)}
              className="w-full bg-gray-100 hover:bg-gray-200 border-2 border-gray-400 rounded-lg p-4 mb-6 cursor-pointer transition-all hover:shadow-lg flex items-center justify-center gap-2 font-bold text-gray-700"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to {company.name} Products
            </button>

            {/* Capabilities */}
            {selectedProduct.capabilities.map((capability, idx) => (
              <div
                key={idx}
                className={`${colors.light} border-2 ${colors.border} rounded-lg p-5`}
              >
                <p className={`text-base font-semibold ${colors.text}`}>{capability}</p>
              </div>
            ))}
          </>
        );
      }

      // Otherwise, show the products
      return products.map(product => (
        <div
          key={product.id}
          onClick={() => handleProductClick(layerId, product.id)}
          className={`${colors.light} border-2 ${colors.border} rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-105`}
        >
          <h3 className={`font-bold text-lg ${colors.text}`}>{product.name}</h3>
          <p className="text-sm text-gray-600 mt-2">{product.capabilities.length} capabilities</p>
        </div>
      ));
    }
  };

  const renderBreadcrumb = () => {
    const level = getCurrentLevel();
    const company = getCurrentCompany();

    return (
      <div className="flex items-center gap-2 text-sm mb-6">
        <button
          onClick={handleReset}
          className={`flex items-center gap-1 px-3 py-1 rounded transition-all ${
            level === 'companies'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Home className="w-4 h-4" />
          Companies
        </button>

        {company && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-1 rounded bg-blue-500 text-white">
              {company.name} Products
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Layer Drill-Down Visualization
          </h1>
          <p className="text-gray-600 text-lg">
            Explore Salesforce ecosystem capabilities across the 5 data layers
          </p>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          {renderBreadcrumb()}
        </div>

        {/* 5 Column Layout */}
        <div className="grid grid-cols-5 gap-6">
          {layers.map(layer => {
            const colors = colorClasses[layer.color];
            
            return (
              <div key={layer.id} className="flex flex-col">
                {/* Layer Header */}
                <div className={`${colors.bg} text-white rounded-t-xl p-6 text-center`}>
                  <h2 className="font-bold text-xl">{layer.name}</h2>
                </div>

                {/* Layer Content */}
                <div className="bg-white rounded-b-xl border-2 border-gray-200 p-6 flex-grow min-h-[600px]">
                  <div className="space-y-4 flex flex-col h-full">
                    {renderColumnContent(layer.id)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {getCurrentLevel() === 'companies' && 'Click any company to see their products across layers'}
          {getCurrentLevel() === 'products' && 'Click any product to see its capabilities in that column. Click again to collapse.'}
        </div>
      </div>
    </div>
  );
};

export default LayerDrillDown;